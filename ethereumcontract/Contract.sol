// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MerchantDashboard {
    struct Dashboard {
        string name;
        string image;
        uint256 totalRevenue;
        uint256 totalOrders;
        uint256 totalProductsSold;
        mapping(string => Product) inventory; // Mapping of product IDs to Product
        string[] inventoryIds;
    }

    struct Merchant {
        mapping(string => Dashboard) dashboards; // Mapping of api keys to Dashboard
        string[] dashboardIds; // Array of api keys to fetch all the dashboard
    }

    struct Product {
        string productId;
        string name;
        string productImage;
        uint256 price;
        uint256 stock;
    }

    struct Purchase {
        string productId;
        uint256 quantity;
        uint256 timestamp;
    }

    mapping(address => Merchant) private merchants; // Mapping of merchant addresses to their details
    mapping(address => mapping(string => Purchase[])) private purchaseHistory;

    event MerchantRegistered(address indexed merchant);
    event DashboardCreated(address indexed merchant, string dashboardId);
    event ProductAdded(
        address indexed merchant,
        string dashboardId,
        string productId
    );
    event ProductPurchased(
        address indexed buyer,
        address indexed merchant,
        string dashboardId,
        string productId,
        uint256 quantity
    );

    // Create a new dashboard for the merchant
    function createDashboard(
        string memory _dashboardApiKey,
        string memory _name,
        string memory _image
    ) external {
        Merchant storage merchant = merchants[msg.sender];
        require(bytes(_dashboardApiKey).length > 0, "Invalid dashboard ID");

        Dashboard storage newDashboard = merchant.dashboards[_dashboardApiKey];
        newDashboard.name = _name;
        newDashboard.image = _image;
        newDashboard.totalRevenue = 0;
        newDashboard.totalOrders = 0;
        newDashboard.totalProductsSold = 0;
        // rgrg

        merchant.dashboardIds.push(_dashboardApiKey);
        emit DashboardCreated(msg.sender, _dashboardApiKey);
    }

    // Add a product to a dashboard's inventory
    function addProduct(
        string memory _productImage,
        string memory _dashboardApiKey,
        string memory _id,
        string memory _name,
        uint256 _price,
        uint256 _stock
    ) external {
        require(_price > 0, "Price must be greater than zero");
        require(_stock > 0, "Stock must be greater than zero");

        Merchant storage merchant = merchants[msg.sender];
        Dashboard storage dashboard = merchant.dashboards[_dashboardApiKey];

        require(bytes(_dashboardApiKey).length > 0, "Invalid dashboard ID");

        Product memory newProduct = Product({
            productId: _id,
            name: _name,
            productImage: _productImage,
            price: _price,
            stock: _stock
        });

        dashboard.inventory[_id] = newProduct;
        dashboard.inventoryIds.push(_id);

        emit ProductAdded(msg.sender, _dashboardApiKey, _id);
    }

    // Purchase a product from a specific dashboard
    function purchaseProduct(
        address _merchant,
        string memory _dashboardApiKey,
        string memory _productId,
        uint256 _quantity,
        uint256 _amount
    ) external {
        require(_quantity > 0, "Quantity must be greater than zero");

        Merchant storage merchant = merchants[_merchant];
        Dashboard storage dashboard = merchant.dashboards[_dashboardApiKey];
        Product storage product = dashboard.inventory[_productId];

        require(product.stock >= _quantity, "Not enough stock");
        require(
            _amount == product.price * _quantity,
            "Incorrect payment amount"
        );

        // Update product stock
        product.stock -= _quantity;

        // Update dashboard details
        dashboard.totalRevenue += _amount;
        dashboard.totalOrders += 1;
        dashboard.totalProductsSold += _quantity;

        // Log purchase
        purchaseHistory[_merchant][_dashboardApiKey].push(
            Purchase({
                productId: _productId,
                quantity: _quantity,
                timestamp: block.timestamp
            })
        );

        emit ProductPurchased(
            msg.sender,
            _merchant,
            _dashboardApiKey,
            _productId,
            _quantity
        );
    }

    // Retrieve dashboard details
    function getDashboardDetails(
        address _merchant,
        string memory _dashboardApiKey
    ) external view returns (uint256, uint256, uint256) {
        Dashboard storage dashboard = merchants[_merchant].dashboards[
            _dashboardApiKey
        ];
        return (
            dashboard.totalRevenue,
            dashboard.totalOrders,
            dashboard.totalProductsSold
        );
    }

    // Retrieve dashboard's inventory
    function getDashboardInventory(
        address _merchant,
        string memory _dashboardApiKey
    ) external view returns (Product[] memory) {
        Dashboard storage dashboard = merchants[_merchant].dashboards[
            _dashboardApiKey
        ];
        string[] storage inventoryIds = dashboard.inventoryIds;
        Product[] memory inventory = new Product[](inventoryIds.length);

        for (uint256 i = 0; i < inventoryIds.length; i++) {
            inventory[i] = dashboard.inventory[inventoryIds[i]];
        }

        return inventory;
    }

    // Retrieve purchase history for a dashboard
    function getPurchaseHistory(
        address _merchant,
        string memory _dashboardApiKey
    ) external view returns (Purchase[] memory) {
        return purchaseHistory[_merchant][_dashboardApiKey];
    }

    // function to fetch all dashboards
    // Retrieve all dashboards with their names and images
    function getAllDashboards(
        address _merchant
    ) external view returns (string[] memory, string[] memory) {
        Merchant storage merchant = merchants[_merchant];
        string[] memory dashboardIds = merchant.dashboardIds;
        string[] memory names = new string[](dashboardIds.length);
        string[] memory images = new string[](dashboardIds.length);

        for (uint256 i = 0; i < dashboardIds.length; i++) {
            Dashboard storage dashboard = merchant.dashboards[dashboardIds[i]];
            names[i] = dashboard.name;
            images[i] = dashboard.image;
        }

        return (names, images);
    }
}

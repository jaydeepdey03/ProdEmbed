
# **Project Name: EmbedCommerce**

**EmbedCommerce** is a versatile e-commerce platform designed to seamlessly manage and embed products into any React-based project. With a powerful SDK, you can easily integrate your products and accept payments via StarkNet and Citrea Ethereum Chain, enabling decentralized and efficient transactions.

## **Features**

- **Product Management**: Effortlessly manage all your products, including details, pricing, and availability.
- **React SDK**: Embed your products directly into any React project with a simple SDK integration.
- **Blockchain Payments**: Enable secure and seamless payments using StarkNet and Citrea Ethereum Chain.
- **Customizable**: Fully customize your storefront and payment processes to suit your brand.
- **Multi-Chain Support**: Accept payments from both StarkNet and Citrea Ethereum Chain, ensuring flexibility in your payment options.
- **Dashboard**: To view your product sales data captured via the SDK

## **Tech Stack**

- **Frontend**: React.js
- **Blockchain Integration**: StarkNet, Citrea Ethereum Chain
- **SDK**: JavaScript SDK for easy integration into React projects


## **Installation**

To install ProdEmbed and get started, follow the steps below:

1. For the SDK integration into your React project, install it via npm:
   ```bash
   npm i prodembed-productitem-sdk
   ```

## **Usage**

### **Integrating the SDK in Your React Project**

1. Import the SDK in your React component:
   ```javascript
    import { ProductCard } from "prodembed-productitem-sdk";
   ```

2. Use the `EmbedCommerce` component to embed products:
   ```jsx
      <ProductCard
        apiKey="<dashboard api key>"
        merchantAddress="<merchants address>"
        productId="<product id>"
      />
      
   ```

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

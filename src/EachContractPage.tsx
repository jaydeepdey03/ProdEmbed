import {useParams} from "react-router-dom";

export default function EachContractPage() {
  const {id} = useParams();
  return <div>{id}</div>;
}

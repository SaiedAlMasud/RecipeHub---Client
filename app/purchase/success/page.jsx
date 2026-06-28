import { Suspense } from "react";
import PurchaseSuccessPage from "./Purchase-success";


export default function Page() {
  return (
    <Suspense fallback={null}>
      <PurchaseSuccessPage />
    </Suspense>
  );
}
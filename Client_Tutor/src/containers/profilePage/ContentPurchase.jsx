import React, { useEffect, useRef, useState } from "react";
import { useGetOrderByUser } from "../../hooks/useOrder";
import ItemInfoPurchase from "./ItemInfoPurchase";
import Loading from "../../components/loader/Loading";

const ContentPurchase = ({ user }) => {
  const { data, isLoading } = useGetOrderByUser();
  const [dataOrders, setDataOrders] = useState(null);
  useEffect(() => {
    if (data && !isLoading) {
      setDataOrders(data.orders);
    }
  }, [data, isLoading]);
  return (
    <div className="w-full">
      <h3 className="font-semibold text-2xl mb-3">Lịch sử thanh toán</h3>
      {isLoading ? (
        <div className="relative w-full flex items-center justify-center h-[80vh]">
          <Loading />
        </div>
      ) : (
        <>
          {dataOrders?.length > 0 ? (
            <div className="w-full flex flex-col gap-3">
              {dataOrders?.map((item, index) => (
                <ItemInfoPurchase item={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="w-full bg-warning/20 text-center">Bạn chưa có đơn thanh toán nào</div>
          )}
        </>
      )}
    </div>
  );
};

export default ContentPurchase;

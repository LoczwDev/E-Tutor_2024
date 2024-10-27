import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useGetStripePublishableKey } from "../../hooks/useOrder";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "../../services/orderService";
import { CheckOutFormCart } from "../../containers/CheckOutFormCart";

const CheckOutCart = () => {
  // Initialize stripePromise with the publishable key
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentData, setPaymentIntentData] = useState(null);

  const [dataCourses, setDataCourses] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const { data: dataConfig, isLoading: isLoadingConfig } =
    useGetStripePublishableKey();

  // Create payment intent mutation
  const { mutate, isPending } = useMutation({
    mutationFn: ({ amount }) => {
      return createPaymentIntent({ amount });
    },
    onSuccess: (data) => {
      setPaymentIntentData(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const [publishableKey, setPublishableKey] = useState(null);

  // Load the publishable key for Stripe and set stripePromis
  useEffect(() => {
    if (dataConfig && !isLoadingConfig) {
      setPublishableKey(dataConfig?.publishablekey);
    }
  }, [dataConfig, isLoadingConfig]);

  useEffect(() => {
    if (publishableKey) {
      setStripePromise(loadStripe(publishableKey));
    }
  }, [publishableKey]);

  useEffect(() => {
    if (dataCourses) {
      const amount = dataCourses?.reduce(
        (total, item) => total + Math.round(item?.estimatedPrice || 0),
        0
      );

      mutate({ amount: parseInt(amount + 7000) });
    }
  }, [dataCourses]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);
  // Breadcrumb data
  const dataBreadCumbs = [
    { name: "Trang chủ", link: "/" },
    { name: "Khóa học", link: "/list-courses" },
    { name: "Thanh toán", link: `/checkout/cart` },
  ];

  return (
    <MainLayout>
      <div className="w-full bg-gray0 flex flex-col items-center justify-center py-5">
        <h3 className="font-semibold text-2xl">Thanh toán</h3>
        <BreadCrumbs data={dataBreadCumbs} />
      </div>
      <SectionLayout>
        {stripePromise && clientSecret && !isLoadingConfig && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckOutFormCart data={dataCourses} clientSecret={clientSecret} />
          </Elements>
        )}
      </SectionLayout>
    </MainLayout>
  );
};

export default CheckOutCart;

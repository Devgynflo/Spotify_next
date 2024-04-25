"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

import Button from "@/components/Button";
import { postData } from "@/libs/helpers";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, user, subscription } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error)?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>Pas d&apos;abonnement actif.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            S&apos;abonner
          </Button>
        </div>
      )}

      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            Vous êtes actuellement sur la page{" "}
            <b>{subscription.prices?.products?.name} abonnement</b>
          </p>
          <Button
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
            disabled={loading || isLoading}
          >
            Ouvrir le portail client
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;

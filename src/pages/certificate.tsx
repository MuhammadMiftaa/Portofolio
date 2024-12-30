import { Card, FocusCards } from "@/components/ui/focus-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CertificateType } from "@/types/CertificateType";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IoClose } from "react-icons/io5";

export default function CertificatePage() {
  let fetcher = async (url: string) => fetch(url).then((res) => res.json());

  // FETCH DATA CERTIFICATE 🥽
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const { data: dataCertificate, isLoading: isLoadingCertificate } = useSWR(
    "/api/certificate",
    fetcher
  );
  useEffect(() => {
    if (dataCertificate) {
      setCertificates(dataCertificate.data);
    }
  }, [dataCertificate]);
  // FETCH DATA CERTIFICATE 🥽

  const [activeTab, setActiveTab] = useState("Codepolitan");
  const [visibleItems, setVisibleItems] = useState<
    Record<"Codepolitan" | "Dicoding" | "MySkill" | "Ruangguru", number>
  >({
    Codepolitan: 6,
    Dicoding: 6,
    MySkill: 6,
    Ruangguru: 6,
  });

  const handleLoadMore = (tab: string) => {
    setVisibleItems((prev) => ({
      ...prev,
      [tab]: certificates.filter((c) => c.organizer === tab).length,
    }));
  };

  return (
    <div className="w-full min-h-screen bg-primary py-12 relative">
      <Link className="group absolute top-5 right-5" href={"/"}>
        <div className="group-hover:rotate-180 duration-1000 ease-unique-ease text-3xl text-zinc-500 hover:text-zinc-200 cursor-pointer rounded-full p-2 border border-zinc-800">
          <IoClose />
        </div>
      </Link>
      <Tabs defaultValue="codepolitan" className="w-full">
        <div className="flex justify-center">
          <TabsList className="justify-between flex-wrap w-3/4 mx-auto my-10 text-neutral-300">
            {["Codepolitan", "Dicoding", "MySkill", "Ruangguru"].map((tab) => (
              <TabsTrigger
                className="group"
                value={tab.toLowerCase()}
                onClick={() => setActiveTab(tab)}
              >
                <span className="peer text-lg font-poppins">{tab}</span>
                <div
                  className={`h-0.5 w-0 group-hover:w-full duration-300 ease-out bg-gradient-to-r from-color-2 to-color-1 ${
                    tab === activeTab ? "w-full" : "w-0"
                  }`}
                ></div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {["Codepolitan", "Dicoding", "MySkill", "Ruangguru"].map((tab) => {
          const filteredCertificates = certificates.filter(
            (c) => c.organizer === tab
          );
          return (
            <TabsContent value={tab.toLowerCase()} key={tab}>
              <FocusCards
                cards={filteredCertificates.slice(
                  0,
                  visibleItems[tab as keyof typeof visibleItems]
                )}
              />
              {visibleItems[tab as keyof typeof visibleItems] <
                filteredCertificates.length && (
                <h1
                  onClick={() => handleLoadMore(tab)}
                  className="mt-10 mx-auto w-fit py-1 px-5 rounded-lg border border-zinc-800 text-zinc-600 font-poppins cursor-pointer hover:text-zinc-200 duration-300"
                >
                  Load more...
                </h1>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

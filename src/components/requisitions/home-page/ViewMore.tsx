import {useRouter} from "next/navigation";
import Button from "@/components/Button";
import {PlusCircle} from "react-feather";
import React from "react";

export function ViewMore({requisitionID}) {
    const router = useRouter()
    const handleViewMoreClick = () => {
        router.push(`/requisitions/${requisitionID}`);
    };

    return (
        <Button
            size="medium"
            intent="primary"
            className="flex items-center gap-1 h-full"
            onClick={handleViewMoreClick}
        >
            <PlusCircle size={16} color="#ffffff" />
            <span className="text-neutral-50 font-bold">More</span>
        </Button>
    );
}
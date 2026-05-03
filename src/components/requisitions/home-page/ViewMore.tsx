import {useRouter} from "next/navigation";
import Button from "@/components/utils/Button";
import {PlusCircle} from "react-feather";
import React from "react";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

export function ViewMore({requisitionID}) {
    const router = useRouter()
    const {startNavigation} = useRouteTransition();
    const handleViewMoreClick = () => {
        startNavigation('Opening requisition details...');
        router.push(`/requisitions/${requisitionID}`);
    };

    return (
        <Button
            size="medium"
            intent="primary"
            className="oasis-button flex h-full items-center gap-1 rounded-2xl"
            onClick={handleViewMoreClick}
        >
            <PlusCircle size={16} color="#ffffff" />
            <span className="font-bold text-neutral-50">Open Requisition</span>
        </Button>
    );
}

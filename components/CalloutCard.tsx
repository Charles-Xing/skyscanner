"use client";

import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";

interface Props {
  message: string;
  warning?: boolean;
}

const CalloutCard = ({ message, warning }: Props) => {
  return (
    <div>
      <Callout
        className="mt-4"
        title={message}
        icon={warning ? ExclamationIcon : CheckCircleIcon}
        color={warning ? 'rose' : 'teal'}
      />
    </div>
  );
};

export default CalloutCard;

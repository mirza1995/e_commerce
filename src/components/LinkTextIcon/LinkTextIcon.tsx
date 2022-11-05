import React from "react";
import { IconType } from "react-icons/lib";
import { FormattedMessage } from "react-intl";
import "./link-text-icon.scss";

interface LinkTextIconProps {
    link: string;
    textId: string;
    defaultText: string;
    icon: IconType
}

const LinkTextIcon = ({link, textId, defaultText, icon}: LinkTextIconProps) => {
    return (
        <div className="c-link-text-icon">
            <FormattedMessage
                id = {textId}
                defaultMessage={defaultText}
            />
            {React.createElement(icon)}
        </div>
    );
}

export default LinkTextIcon;
import React from "react";
import {useLayoutTitleEffect} from "@components/layout/context";
import Helmet from "react-helmet"
import {useTranslation} from "react-i18next";

export function Title({labelKey}: { labelKey: string }) {
    const {t} = useTranslation(['main'])

    useLayoutTitleEffect(t(labelKey))

    return (
        <>
            <Helmet>
                <title>{t(labelKey)} | {t("knot")}</title>
            </Helmet>
        </>

    )
}
import {Container} from "@mui/material";
import {
    dehydrate,
    HydrationBoundary, QueryClient,
} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

export default async function RootLayout({children}: PropsWithChildren) {
    const queryClient = new QueryClient();

    const content = (
        <main>
            <Container maxWidth={'xl'}>{children}</Container>
        </main>
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {content}
        </HydrationBoundary>
    );
}

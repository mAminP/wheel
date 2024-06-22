"use client";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { RewardType } from "@/app/types/RewardType";
import {ContentCopy, ContentPaste} from "@mui/icons-material";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

type Props = {
  item: RewardType;
};
export default function RewardCard(props: Props) {
  const { item } = props;
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  return (
    <Card
      sx={{ borderRadius: 5, backgroundColor: "success.200" }}
      variant={"outlined"}
    >
      <CardContent>
        <Typography variant={"body2"}>
          یک عدد {item.title} برنده شدی!
        </Typography>
        <Box sx={{ mt: 2 }}>
          <CopyToClipboard text={item.code} onCopy={() => setCopied(true)}>
            <Card
              sx={{ borderRadius: 5, backgroundColor: "white" }}
              elevation={0}
            >
              <Stack
                direction={"row"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontWeight={"100"}
                  fontSize={"larger"}
                  textAlign={"center"}
                  variant={"body2"}
                  width={"100%"}
                >
                  {item.code}
                </Typography>
                <Divider flexItem={true} orientation={"vertical"} />
                {copied ? (
                  <Button
                    startIcon={<ContentPaste />}
                    color={"inherit"}
                    sx={{
                      borderRadius: 5,
                      minWidth: 100,
                      px:2
                    }}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    کپی شد
                  </Button>
                ) : (
                  <Button
                    startIcon={<ContentCopy />}
                    color={"success"}
                    sx={{
                      borderRadius: 5,
                      minWidth: 100,
                      px:2
                    }}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    کپی کد
                  </Button>
                )}
              </Stack>
            </Card>
          </CopyToClipboard>
        </Box>
      </CardContent>
    </Card>
  );
}

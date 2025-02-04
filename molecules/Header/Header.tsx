import { useEktaApiClient } from "@/api";
import { Button, Div, Text } from "@/components";
import { EKTA_API_URL } from "@/constants";
import { clearSession, useAppDispatch, useSelectorSessionUser } from "@/store";
import colors from "@/theme/colors";
import { deleteAllCookies, getAccessToken, getRefreshToken, useSetQueryParams } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Clickable } from "../Clickable/Clickable";

// Header Component
export const Header: React.FC<{ onClickNewChat: () => void }> = ({ onClickNewChat }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useEktaApiClient();
  const setQueryParams = useSetQueryParams();
  const dispatch = useAppDispatch();
  const sessionUser = useSelectorSessionUser();
  const isSignUp = searchParams.get("step") === "sign_up";
  const isSignIn = searchParams.get("step") === "sign_in";
  const [tokens, setTokens] = useState<any>();

  useEffect(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    setTokens({ accessToken, refreshToken });
  }, [sessionUser]);

  const handleSignOut = () => {
    api.auth.signOut().then((res) => {
      deleteAllCookies();
      dispatch(clearSession());
      router.replace("/");
    });
  };
  const handleSignUp = () => {
    setQueryParams(!isSignUp ? { sign_in: "true", step: "sign_up" } : {}, { replace: true });
  };
  const handleSignIn = () => {
    setQueryParams(!isSignIn ? { sign_in: "true", step: "sign_in" } : {}, { replace: true });
  };

  return (
    <Div className="w-full h-[86px] justify-between p-[25px] flex-row" style={{ backgroundColor: colors.background }}>
      <Div className="flex-row">
        <Clickable onClick={onClickNewChat}>
          <Image src={"/new-chat.svg"} width={24} height={28} alt="new chat" />
        </Clickable>
        {EKTA_API_URL.includes("staging") ? (
          <>
            <Div className="relative">
              <Div className="absolute left-4">
                <Text fontSize={10}>A: {tokens?.accessToken}</Text>
                <Text fontSize={10}>R: {tokens?.refreshToken}</Text>
              </Div>
            </Div>
          </>
        ) : null}
      </Div>

      <Div className="gap-4 z-10" row>
        {sessionUser ? (
          <>
            <Button className="w-[90px] h-[36px]" onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button className="w-[140px] h-[36px]" onClick={handleSignUp}>
              Sign up (test)
            </Button>
            <Button className="w-[90px] h-[36px]" onClick={handleSignIn}>
              Log in
            </Button>
          </>
        )}
      </Div>
    </Div>
  );
};

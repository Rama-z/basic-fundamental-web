export type Event =
  | {
      type: "LOGIN";
      payload: {
        userId: string;
      };
    }
  | {
      type: "LOGOUT";
    };

const sendEvent = <Type extends Event["type"]>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer TPayload }
    ? [Type, TPayload]
    : [Type]
) => {};

sendEvent("LOGIN", {
  userId: "asdasd",
});
sendEvent("LOGOUT");

const sendEvent2 = (event: Event) => {};

sendEvent2({ type: "LOGOUT" });

export type X = { b; type: "login"; payload: string };

export type Y = {
  type: "logout";
  password: string;
};

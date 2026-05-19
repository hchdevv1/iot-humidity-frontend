/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { transactionSocket } from "@/lib/socket";

export function useTransactionsSocket() {
  const queryClient =
    useQueryClient();

  /**
   * connection state
   */
  const [
    isConnected,
    setIsConnected,
  ] = useState(false);

  /**
   * reconnecting state
   */
  const [
    isReconnecting,
    setIsReconnecting,
  ] = useState(false);

  /**
   * debounce timer
   */
  const refreshTimeoutRef =
    useRef<
      NodeJS.Timeout | undefined
    >(undefined);

  useEffect(() => {
    /**
     * connect
     */
    const handleConnect = () => {
      console.log(
        "WS CONNECTED",
      );

      setIsConnected(true);

      setIsReconnecting(false);
    };

    /**
     * disconnect
     */
    const handleDisconnect = () => {
      console.log(
        "WS DISCONNECTED",
      );

      setIsConnected(false);
    };

    /**
     * reconnect attempt
     */
    const handleReconnectAttempt =() => {
        console.log(
          "WS RECONNECTING...",
        );

        setIsReconnecting(
          true,
        );
      };

    /**
     * latest transactions
     */
    const handleLatestTransactions =
      (
        payload: unknown,
      ) => {
        console.log(
          "WS RECEIVE",
          payload,
          new Date(),
        );

        /**
         * debounce refresh
         */
        if (
          refreshTimeoutRef.current
        ) {
          clearTimeout(
            refreshTimeoutRef.current,
          );
        }

        refreshTimeoutRef.current =
          setTimeout(() => {
            console.log(
              "WS INVALIDATE QUERIES",
            );

            /**
             * latest transactions
             */
            queryClient.invalidateQueries(
              {
                queryKey: [
                  "latest-transactions",
                ],

                exact: false,
              },
            );

            /**
             * charts
             */
            queryClient.invalidateQueries(
              {
                queryKey: [
                  "transaction-charts",
                ],

                exact: false,
              },
            );

            /**
             * offline devices
             */
            queryClient.invalidateQueries(
              {
                queryKey: [
                  "offline-devices",
                ],

                exact: false,
              },
            );
          }, 15000);
      };

    /**
     * listeners
     */
    transactionSocket.on(
      "connect",
      handleConnect,
    );

    transactionSocket.on(
      "disconnect",
      handleDisconnect,
    );

    transactionSocket.io.on(
      "reconnect_attempt",
      handleReconnectAttempt,
    );

    transactionSocket.on(
      "latest-transactions",
      handleLatestTransactions,
    );

    /**
     * initial state
     */
    setIsConnected(
      transactionSocket.connected,
    );

    /**
     * cleanup
     */
    return () => {
      transactionSocket.off(
        "connect",
        handleConnect,
      );

      transactionSocket.off(
        "disconnect",
        handleDisconnect,
      );

      transactionSocket.io.off(
        "reconnect_attempt",
        handleReconnectAttempt,
      );

      transactionSocket.off(
        "latest-transactions",
        handleLatestTransactions,
      );

      /**
       * clear timeout
       */
      if (
        refreshTimeoutRef.current
      ) {
        clearTimeout(
          refreshTimeoutRef.current,
        );
      }
    };
  }, [queryClient]);

  return {
    isConnected,

    isReconnecting,
  };
}
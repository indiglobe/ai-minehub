export interface ServerToClientEvents {
  "trader-joined": () => void;
  "trader-left": () => void;
}

export interface ClientToServerEvents {
  "join-trading": () => void;
  "leave-trading": () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {}

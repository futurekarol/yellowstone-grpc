/* eslint-disable */
import {
  ChannelCredentials,
  Client,
  ClientDuplexStream,
  handleBidiStreamingCall,
  makeGenericClientConstructor,
  Metadata,
} from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";
import {
  BlockHeight,
  Rewards,
  Transaction,
  TransactionStatusMeta,
  UnixTimestamp,
} from "./solana-storage";
import Long = require("long");

export const protobufPackage = "geyser";

export enum CommitmentLevel {
  PROCESSED = 0,
  CONFIRMED = 1,
  FINALIZED = 2,
  UNRECOGNIZED = -1,
}

export function commitmentLevelFromJSON(object: any): CommitmentLevel {
  switch (object) {
    case 0:
    case "PROCESSED":
      return CommitmentLevel.PROCESSED;
    case 1:
    case "CONFIRMED":
      return CommitmentLevel.CONFIRMED;
    case 2:
    case "FINALIZED":
      return CommitmentLevel.FINALIZED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommitmentLevel.UNRECOGNIZED;
  }
}

export function commitmentLevelToJSON(object: CommitmentLevel): string {
  switch (object) {
    case CommitmentLevel.PROCESSED:
      return "PROCESSED";
    case CommitmentLevel.CONFIRMED:
      return "CONFIRMED";
    case CommitmentLevel.FINALIZED:
      return "FINALIZED";
    case CommitmentLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface SubscribeRequest {
  accounts: { [key: string]: SubscribeRequestFilterAccounts };
  slots: { [key: string]: SubscribeRequestFilterSlots };
  transactions: { [key: string]: SubscribeRequestFilterTransactions };
  blocks: { [key: string]: SubscribeRequestFilterBlocks };
  blocksMeta: { [key: string]: SubscribeRequestFilterBlocksMeta };
  entry: { [key: string]: SubscribeRequestFilterEntry };
  commitment?: CommitmentLevel | undefined;
  accountsDataSlice: SubscribeRequestAccountsDataSlice[];
  ping?: SubscribeRequestPing | undefined;
}

export interface SubscribeRequest_AccountsEntry {
  key: string;
  value: SubscribeRequestFilterAccounts | undefined;
}

export interface SubscribeRequest_SlotsEntry {
  key: string;
  value: SubscribeRequestFilterSlots | undefined;
}

export interface SubscribeRequest_TransactionsEntry {
  key: string;
  value: SubscribeRequestFilterTransactions | undefined;
}

export interface SubscribeRequest_BlocksEntry {
  key: string;
  value: SubscribeRequestFilterBlocks | undefined;
}

export interface SubscribeRequest_BlocksMetaEntry {
  key: string;
  value: SubscribeRequestFilterBlocksMeta | undefined;
}

export interface SubscribeRequest_EntryEntry {
  key: string;
  value: SubscribeRequestFilterEntry | undefined;
}

export interface SubscribeRequestFilterAccounts {
  account: string[];
  owner: string[];
  filters: SubscribeRequestFilterAccountsFilter[];
}

export interface SubscribeRequestFilterAccountsFilter {
  memcmp?: SubscribeRequestFilterAccountsFilterMemcmp | undefined;
  datasize?: string | undefined;
  tokenAccountState?: boolean | undefined;
}

export interface SubscribeRequestFilterAccountsFilterMemcmp {
  offset: string;
  bytes?: Uint8Array | undefined;
  base58?: string | undefined;
  base64?: string | undefined;
}

export interface SubscribeRequestFilterSlots {
  filterByCommitment?: boolean | undefined;
}

export interface SubscribeRequestFilterTransactions {
  vote?: boolean | undefined;
  failed?: boolean | undefined;
  signature?: string | undefined;
  accountInclude: string[];
  accountExclude: string[];
  accountRequired: string[];
}

export interface SubscribeRequestFilterBlocks {
  accountInclude: string[];
  includeTransactions?: boolean | undefined;
  includeAccounts?: boolean | undefined;
  includeEntries?: boolean | undefined;
}

export interface SubscribeRequestFilterBlocksMeta {}

export interface SubscribeRequestFilterEntry {}

export interface SubscribeRequestAccountsDataSlice {
  offset: string;
  length: string;
}

export interface SubscribeRequestPing {
  id: number;
}

export interface SubscribeUpdate {
  filters: string[];
  account?: SubscribeUpdateAccount | undefined;
  slot?: SubscribeUpdateSlot | undefined;
  transaction?: SubscribeUpdateTransaction | undefined;
  block?: SubscribeUpdateBlock | undefined;
  ping?: SubscribeUpdatePing | undefined;
  pong?: SubscribeUpdatePong | undefined;
  blockMeta?: SubscribeUpdateBlockMeta | undefined;
  entry?: SubscribeUpdateEntry | undefined;
}

export interface SubscribeUpdateAccount {
  account: SubscribeUpdateAccountInfo | undefined;
  slot: string;
  isStartup: boolean;
}

export interface SubscribeUpdateAccountInfo {
  pubkey: Uint8Array;
  lamports: string;
  owner: Uint8Array;
  executable: boolean;
  rentEpoch: string;
  data: Uint8Array;
  writeVersion: string;
  txnSignature?: Uint8Array | undefined;
}

export interface SubscribeUpdateSlot {
  slot: string;
  parent?: string | undefined;
  status: CommitmentLevel;
}

export interface SubscribeUpdateTransaction {
  transaction: SubscribeUpdateTransactionInfo | undefined;
  slot: string;
}

export interface SubscribeUpdateTransactionInfo {
  signature: Uint8Array;
  isVote: boolean;
  transaction: Transaction | undefined;
  meta: TransactionStatusMeta | undefined;
  index: string;
}

export interface SubscribeUpdateBlock {
  slot: string;
  blockhash: string;
  rewards: Rewards | undefined;
  blockTime: UnixTimestamp | undefined;
  blockHeight: BlockHeight | undefined;
  parentSlot: string;
  parentBlockhash: string;
  executedTransactionCount: string;
  transactions: SubscribeUpdateTransactionInfo[];
  updatedAccountCount: string;
  accounts: SubscribeUpdateAccountInfo[];
  entriesCount: string;
  entries: SubscribeUpdateEntry[];
}

export interface SubscribeUpdateBlockMeta {
  slot: string;
  blockhash: string;
  rewards: Rewards | undefined;
  blockTime: UnixTimestamp | undefined;
  blockHeight: BlockHeight | undefined;
  parentSlot: string;
  parentBlockhash: string;
  executedTransactionCount: string;
}

export interface SubscribeUpdateEntry {
  slot: string;
  index: string;
  numHashes: string;
  hash: Uint8Array;
  executedTransactionCount: string;
}

export interface SubscribeUpdatePing {}

export interface SubscribeUpdatePong {
  id: number;
}

export interface PingRequest {
  count: number;
}

export interface PongResponse {
  count: number;
}

export interface GetLatestBlockhashRequest {
  commitment?: CommitmentLevel | undefined;
}

export interface GetLatestBlockhashResponse {
  slot: string;
  blockhash: string;
  lastValidBlockHeight: string;
}

export interface GetBlockHeightRequest {
  commitment?: CommitmentLevel | undefined;
}

export interface GetBlockHeightResponse {
  blockHeight: string;
}

export interface GetSlotRequest {
  commitment?: CommitmentLevel | undefined;
}

export interface GetSlotResponse {
  slot: string;
}

export interface GetVersionRequest {}

export interface GetVersionResponse {
  version: string;
}

export interface IsBlockhashValidRequest {
  blockhash: string;
  commitment?: CommitmentLevel | undefined;
}

export interface IsBlockhashValidResponse {
  slot: string;
  valid: boolean;
}

function createBaseSubscribeRequest(): SubscribeRequest {
  return {
    accounts: {},
    slots: {},
    transactions: {},
    blocks: {},
    blocksMeta: {},
    entry: {},
    commitment: undefined,
    accountsDataSlice: [],
    ping: undefined,
  };
}

export const SubscribeRequest = {
  encode(
    message: SubscribeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.accounts).forEach(([key, value]) => {
      SubscribeRequest_AccountsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    Object.entries(message.slots).forEach(([key, value]) => {
      SubscribeRequest_SlotsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    Object.entries(message.transactions).forEach(([key, value]) => {
      SubscribeRequest_TransactionsEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    Object.entries(message.blocks).forEach(([key, value]) => {
      SubscribeRequest_BlocksEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    Object.entries(message.blocksMeta).forEach(([key, value]) => {
      SubscribeRequest_BlocksMetaEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    Object.entries(message.entry).forEach(([key, value]) => {
      SubscribeRequest_EntryEntry.encode(
        { key: key as any, value },
        writer.uint32(66).fork()
      ).ldelim();
    });
    if (message.commitment !== undefined) {
      writer.uint32(48).int32(message.commitment);
    }
    for (const v of message.accountsDataSlice) {
      SubscribeRequestAccountsDataSlice.encode(
        v!,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.ping !== undefined) {
      SubscribeRequestPing.encode(
        message.ping,
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = SubscribeRequest_AccountsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.accounts[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = SubscribeRequest_SlotsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.slots[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = SubscribeRequest_TransactionsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.transactions[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = SubscribeRequest_BlocksEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry4.value !== undefined) {
            message.blocks[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = SubscribeRequest_BlocksMetaEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== undefined) {
            message.blocksMeta[entry5.key] = entry5.value;
          }
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          const entry8 = SubscribeRequest_EntryEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry8.value !== undefined) {
            message.entry[entry8.key] = entry8.value;
          }
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.commitment = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.accountsDataSlice.push(
            SubscribeRequestAccountsDataSlice.decode(reader, reader.uint32())
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.ping = SubscribeRequestPing.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest {
    return {
      accounts: isObject(object.accounts)
        ? Object.entries(object.accounts).reduce<{
            [key: string]: SubscribeRequestFilterAccounts;
          }>((acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterAccounts.fromJSON(value);
            return acc;
          }, {})
        : {},
      slots: isObject(object.slots)
        ? Object.entries(object.slots).reduce<{
            [key: string]: SubscribeRequestFilterSlots;
          }>((acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterSlots.fromJSON(value);
            return acc;
          }, {})
        : {},
      transactions: isObject(object.transactions)
        ? Object.entries(object.transactions).reduce<{
            [key: string]: SubscribeRequestFilterTransactions;
          }>((acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterTransactions.fromJSON(value);
            return acc;
          }, {})
        : {},
      blocks: isObject(object.blocks)
        ? Object.entries(object.blocks).reduce<{
            [key: string]: SubscribeRequestFilterBlocks;
          }>((acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterBlocks.fromJSON(value);
            return acc;
          }, {})
        : {},
      blocksMeta: isObject(object.blocksMeta)
        ? Object.entries(object.blocksMeta).reduce<{
            [key: string]: SubscribeRequestFilterBlocksMeta;
          }>((acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterBlocksMeta.fromJSON(value);
            return acc;
          }, {})
        : {},
      entry: isObject(object.entry)
        ? Object.entries(object.entry).reduce<{
            [key: string]: SubscribeRequestFilterEntry;
          }>((acc, [key, value]) => {
            acc[key] = SubscribeRequestFilterEntry.fromJSON(value);
            return acc;
          }, {})
        : {},
      commitment: isSet(object.commitment)
        ? commitmentLevelFromJSON(object.commitment)
        : undefined,
      accountsDataSlice: globalThis.Array.isArray(object?.accountsDataSlice)
        ? object.accountsDataSlice.map((e: any) =>
            SubscribeRequestAccountsDataSlice.fromJSON(e)
          )
        : [],
      ping: isSet(object.ping)
        ? SubscribeRequestPing.fromJSON(object.ping)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest): unknown {
    const obj: any = {};
    if (message.accounts) {
      const entries = Object.entries(message.accounts);
      if (entries.length > 0) {
        obj.accounts = {};
        entries.forEach(([k, v]) => {
          obj.accounts[k] = SubscribeRequestFilterAccounts.toJSON(v);
        });
      }
    }
    if (message.slots) {
      const entries = Object.entries(message.slots);
      if (entries.length > 0) {
        obj.slots = {};
        entries.forEach(([k, v]) => {
          obj.slots[k] = SubscribeRequestFilterSlots.toJSON(v);
        });
      }
    }
    if (message.transactions) {
      const entries = Object.entries(message.transactions);
      if (entries.length > 0) {
        obj.transactions = {};
        entries.forEach(([k, v]) => {
          obj.transactions[k] = SubscribeRequestFilterTransactions.toJSON(v);
        });
      }
    }
    if (message.blocks) {
      const entries = Object.entries(message.blocks);
      if (entries.length > 0) {
        obj.blocks = {};
        entries.forEach(([k, v]) => {
          obj.blocks[k] = SubscribeRequestFilterBlocks.toJSON(v);
        });
      }
    }
    if (message.blocksMeta) {
      const entries = Object.entries(message.blocksMeta);
      if (entries.length > 0) {
        obj.blocksMeta = {};
        entries.forEach(([k, v]) => {
          obj.blocksMeta[k] = SubscribeRequestFilterBlocksMeta.toJSON(v);
        });
      }
    }
    if (message.entry) {
      const entries = Object.entries(message.entry);
      if (entries.length > 0) {
        obj.entry = {};
        entries.forEach(([k, v]) => {
          obj.entry[k] = SubscribeRequestFilterEntry.toJSON(v);
        });
      }
    }
    if (message.commitment !== undefined) {
      obj.commitment = commitmentLevelToJSON(message.commitment);
    }
    if (message.accountsDataSlice?.length) {
      obj.accountsDataSlice = message.accountsDataSlice.map((e) =>
        SubscribeRequestAccountsDataSlice.toJSON(e)
      );
    }
    if (message.ping !== undefined) {
      obj.ping = SubscribeRequestPing.toJSON(message.ping);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest>, I>>(
    base?: I
  ): SubscribeRequest {
    return SubscribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest>, I>>(
    object: I
  ): SubscribeRequest {
    const message = createBaseSubscribeRequest();
    message.accounts = Object.entries(object.accounts ?? {}).reduce<{
      [key: string]: SubscribeRequestFilterAccounts;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterAccounts.fromPartial(value);
      }
      return acc;
    }, {});
    message.slots = Object.entries(object.slots ?? {}).reduce<{
      [key: string]: SubscribeRequestFilterSlots;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterSlots.fromPartial(value);
      }
      return acc;
    }, {});
    message.transactions = Object.entries(object.transactions ?? {}).reduce<{
      [key: string]: SubscribeRequestFilterTransactions;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterTransactions.fromPartial(value);
      }
      return acc;
    }, {});
    message.blocks = Object.entries(object.blocks ?? {}).reduce<{
      [key: string]: SubscribeRequestFilterBlocks;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterBlocks.fromPartial(value);
      }
      return acc;
    }, {});
    message.blocksMeta = Object.entries(object.blocksMeta ?? {}).reduce<{
      [key: string]: SubscribeRequestFilterBlocksMeta;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterBlocksMeta.fromPartial(value);
      }
      return acc;
    }, {});
    message.entry = Object.entries(object.entry ?? {}).reduce<{
      [key: string]: SubscribeRequestFilterEntry;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = SubscribeRequestFilterEntry.fromPartial(value);
      }
      return acc;
    }, {});
    message.commitment = object.commitment ?? undefined;
    message.accountsDataSlice =
      object.accountsDataSlice?.map((e) =>
        SubscribeRequestAccountsDataSlice.fromPartial(e)
      ) || [];
    message.ping =
      object.ping !== undefined && object.ping !== null
        ? SubscribeRequestPing.fromPartial(object.ping)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequest_AccountsEntry(): SubscribeRequest_AccountsEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_AccountsEntry = {
  encode(
    message: SubscribeRequest_AccountsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterAccounts.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequest_AccountsEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_AccountsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterAccounts.decode(
            reader,
            reader.uint32()
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest_AccountsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value)
        ? SubscribeRequestFilterAccounts.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest_AccountsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterAccounts.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_AccountsEntry>, I>>(
    base?: I
  ): SubscribeRequest_AccountsEntry {
    return SubscribeRequest_AccountsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest_AccountsEntry>, I>>(
    object: I
  ): SubscribeRequest_AccountsEntry {
    const message = createBaseSubscribeRequest_AccountsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? SubscribeRequestFilterAccounts.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequest_SlotsEntry(): SubscribeRequest_SlotsEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_SlotsEntry = {
  encode(
    message: SubscribeRequest_SlotsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterSlots.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequest_SlotsEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_SlotsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterSlots.decode(
            reader,
            reader.uint32()
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest_SlotsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value)
        ? SubscribeRequestFilterSlots.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest_SlotsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterSlots.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_SlotsEntry>, I>>(
    base?: I
  ): SubscribeRequest_SlotsEntry {
    return SubscribeRequest_SlotsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest_SlotsEntry>, I>>(
    object: I
  ): SubscribeRequest_SlotsEntry {
    const message = createBaseSubscribeRequest_SlotsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? SubscribeRequestFilterSlots.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequest_TransactionsEntry(): SubscribeRequest_TransactionsEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_TransactionsEntry = {
  encode(
    message: SubscribeRequest_TransactionsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterTransactions.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequest_TransactionsEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_TransactionsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterTransactions.decode(
            reader,
            reader.uint32()
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest_TransactionsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value)
        ? SubscribeRequestFilterTransactions.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest_TransactionsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterTransactions.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_TransactionsEntry>, I>>(
    base?: I
  ): SubscribeRequest_TransactionsEntry {
    return SubscribeRequest_TransactionsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequest_TransactionsEntry>, I>
  >(object: I): SubscribeRequest_TransactionsEntry {
    const message = createBaseSubscribeRequest_TransactionsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? SubscribeRequestFilterTransactions.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequest_BlocksEntry(): SubscribeRequest_BlocksEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_BlocksEntry = {
  encode(
    message: SubscribeRequest_BlocksEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterBlocks.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequest_BlocksEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_BlocksEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterBlocks.decode(
            reader,
            reader.uint32()
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest_BlocksEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value)
        ? SubscribeRequestFilterBlocks.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest_BlocksEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterBlocks.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_BlocksEntry>, I>>(
    base?: I
  ): SubscribeRequest_BlocksEntry {
    return SubscribeRequest_BlocksEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest_BlocksEntry>, I>>(
    object: I
  ): SubscribeRequest_BlocksEntry {
    const message = createBaseSubscribeRequest_BlocksEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? SubscribeRequestFilterBlocks.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequest_BlocksMetaEntry(): SubscribeRequest_BlocksMetaEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_BlocksMetaEntry = {
  encode(
    message: SubscribeRequest_BlocksMetaEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterBlocksMeta.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequest_BlocksMetaEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_BlocksMetaEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterBlocksMeta.decode(
            reader,
            reader.uint32()
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest_BlocksMetaEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value)
        ? SubscribeRequestFilterBlocksMeta.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest_BlocksMetaEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterBlocksMeta.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_BlocksMetaEntry>, I>>(
    base?: I
  ): SubscribeRequest_BlocksMetaEntry {
    return SubscribeRequest_BlocksMetaEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequest_BlocksMetaEntry>, I>
  >(object: I): SubscribeRequest_BlocksMetaEntry {
    const message = createBaseSubscribeRequest_BlocksMetaEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? SubscribeRequestFilterBlocksMeta.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequest_EntryEntry(): SubscribeRequest_EntryEntry {
  return { key: "", value: undefined };
}

export const SubscribeRequest_EntryEntry = {
  encode(
    message: SubscribeRequest_EntryEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SubscribeRequestFilterEntry.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequest_EntryEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequest_EntryEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = SubscribeRequestFilterEntry.decode(
            reader,
            reader.uint32()
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequest_EntryEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value)
        ? SubscribeRequestFilterEntry.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequest_EntryEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = SubscribeRequestFilterEntry.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequest_EntryEntry>, I>>(
    base?: I
  ): SubscribeRequest_EntryEntry {
    return SubscribeRequest_EntryEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequest_EntryEntry>, I>>(
    object: I
  ): SubscribeRequest_EntryEntry {
    const message = createBaseSubscribeRequest_EntryEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? SubscribeRequestFilterEntry.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseSubscribeRequestFilterAccounts(): SubscribeRequestFilterAccounts {
  return { account: [], owner: [], filters: [] };
}

export const SubscribeRequestFilterAccounts = {
  encode(
    message: SubscribeRequestFilterAccounts,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.account) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.owner) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.filters) {
      SubscribeRequestFilterAccountsFilter.encode(
        v!,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterAccounts {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterAccounts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.filters.push(
            SubscribeRequestFilterAccountsFilter.decode(reader, reader.uint32())
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestFilterAccounts {
    return {
      account: globalThis.Array.isArray(object?.account)
        ? object.account.map((e: any) => globalThis.String(e))
        : [],
      owner: globalThis.Array.isArray(object?.owner)
        ? object.owner.map((e: any) => globalThis.String(e))
        : [],
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) =>
            SubscribeRequestFilterAccountsFilter.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: SubscribeRequestFilterAccounts): unknown {
    const obj: any = {};
    if (message.account?.length) {
      obj.account = message.account;
    }
    if (message.owner?.length) {
      obj.owner = message.owner;
    }
    if (message.filters?.length) {
      obj.filters = message.filters.map((e) =>
        SubscribeRequestFilterAccountsFilter.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterAccounts>, I>>(
    base?: I
  ): SubscribeRequestFilterAccounts {
    return SubscribeRequestFilterAccounts.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequestFilterAccounts>, I>>(
    object: I
  ): SubscribeRequestFilterAccounts {
    const message = createBaseSubscribeRequestFilterAccounts();
    message.account = object.account?.map((e) => e) || [];
    message.owner = object.owner?.map((e) => e) || [];
    message.filters =
      object.filters?.map((e) =>
        SubscribeRequestFilterAccountsFilter.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseSubscribeRequestFilterAccountsFilter(): SubscribeRequestFilterAccountsFilter {
  return {
    memcmp: undefined,
    datasize: undefined,
    tokenAccountState: undefined,
  };
}

export const SubscribeRequestFilterAccountsFilter = {
  encode(
    message: SubscribeRequestFilterAccountsFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.memcmp !== undefined) {
      SubscribeRequestFilterAccountsFilterMemcmp.encode(
        message.memcmp,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.datasize !== undefined) {
      writer.uint32(16).uint64(message.datasize);
    }
    if (message.tokenAccountState !== undefined) {
      writer.uint32(24).bool(message.tokenAccountState);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterAccountsFilter {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterAccountsFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.memcmp = SubscribeRequestFilterAccountsFilterMemcmp.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.datasize = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.tokenAccountState = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestFilterAccountsFilter {
    return {
      memcmp: isSet(object.memcmp)
        ? SubscribeRequestFilterAccountsFilterMemcmp.fromJSON(object.memcmp)
        : undefined,
      datasize: isSet(object.datasize)
        ? globalThis.String(object.datasize)
        : undefined,
      tokenAccountState: isSet(object.tokenAccountState)
        ? globalThis.Boolean(object.tokenAccountState)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequestFilterAccountsFilter): unknown {
    const obj: any = {};
    if (message.memcmp !== undefined) {
      obj.memcmp = SubscribeRequestFilterAccountsFilterMemcmp.toJSON(
        message.memcmp
      );
    }
    if (message.datasize !== undefined) {
      obj.datasize = message.datasize;
    }
    if (message.tokenAccountState !== undefined) {
      obj.tokenAccountState = message.tokenAccountState;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterAccountsFilter>, I>>(
    base?: I
  ): SubscribeRequestFilterAccountsFilter {
    return SubscribeRequestFilterAccountsFilter.fromPartial(
      base ?? ({} as any)
    );
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequestFilterAccountsFilter>, I>
  >(object: I): SubscribeRequestFilterAccountsFilter {
    const message = createBaseSubscribeRequestFilterAccountsFilter();
    message.memcmp =
      object.memcmp !== undefined && object.memcmp !== null
        ? SubscribeRequestFilterAccountsFilterMemcmp.fromPartial(object.memcmp)
        : undefined;
    message.datasize = object.datasize ?? undefined;
    message.tokenAccountState = object.tokenAccountState ?? undefined;
    return message;
  },
};

function createBaseSubscribeRequestFilterAccountsFilterMemcmp(): SubscribeRequestFilterAccountsFilterMemcmp {
  return {
    offset: "0",
    bytes: undefined,
    base58: undefined,
    base64: undefined,
  };
}

export const SubscribeRequestFilterAccountsFilterMemcmp = {
  encode(
    message: SubscribeRequestFilterAccountsFilterMemcmp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.offset !== "0") {
      writer.uint32(8).uint64(message.offset);
    }
    if (message.bytes !== undefined) {
      writer.uint32(18).bytes(message.bytes);
    }
    if (message.base58 !== undefined) {
      writer.uint32(26).string(message.base58);
    }
    if (message.base64 !== undefined) {
      writer.uint32(34).string(message.base64);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterAccountsFilterMemcmp {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterAccountsFilterMemcmp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bytes = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.base58 = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.base64 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestFilterAccountsFilterMemcmp {
    return {
      offset: isSet(object.offset) ? globalThis.String(object.offset) : "0",
      bytes: isSet(object.bytes) ? bytesFromBase64(object.bytes) : undefined,
      base58: isSet(object.base58)
        ? globalThis.String(object.base58)
        : undefined,
      base64: isSet(object.base64)
        ? globalThis.String(object.base64)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequestFilterAccountsFilterMemcmp): unknown {
    const obj: any = {};
    if (message.offset !== "0") {
      obj.offset = message.offset;
    }
    if (message.bytes !== undefined) {
      obj.bytes = base64FromBytes(message.bytes);
    }
    if (message.base58 !== undefined) {
      obj.base58 = message.base58;
    }
    if (message.base64 !== undefined) {
      obj.base64 = message.base64;
    }
    return obj;
  },

  create<
    I extends Exact<DeepPartial<SubscribeRequestFilterAccountsFilterMemcmp>, I>
  >(base?: I): SubscribeRequestFilterAccountsFilterMemcmp {
    return SubscribeRequestFilterAccountsFilterMemcmp.fromPartial(
      base ?? ({} as any)
    );
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequestFilterAccountsFilterMemcmp>, I>
  >(object: I): SubscribeRequestFilterAccountsFilterMemcmp {
    const message = createBaseSubscribeRequestFilterAccountsFilterMemcmp();
    message.offset = object.offset ?? "0";
    message.bytes = object.bytes ?? undefined;
    message.base58 = object.base58 ?? undefined;
    message.base64 = object.base64 ?? undefined;
    return message;
  },
};

function createBaseSubscribeRequestFilterSlots(): SubscribeRequestFilterSlots {
  return { filterByCommitment: undefined };
}

export const SubscribeRequestFilterSlots = {
  encode(
    message: SubscribeRequestFilterSlots,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.filterByCommitment !== undefined) {
      writer.uint32(8).bool(message.filterByCommitment);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterSlots {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterSlots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.filterByCommitment = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestFilterSlots {
    return {
      filterByCommitment: isSet(object.filterByCommitment)
        ? globalThis.Boolean(object.filterByCommitment)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequestFilterSlots): unknown {
    const obj: any = {};
    if (message.filterByCommitment !== undefined) {
      obj.filterByCommitment = message.filterByCommitment;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterSlots>, I>>(
    base?: I
  ): SubscribeRequestFilterSlots {
    return SubscribeRequestFilterSlots.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequestFilterSlots>, I>>(
    object: I
  ): SubscribeRequestFilterSlots {
    const message = createBaseSubscribeRequestFilterSlots();
    message.filterByCommitment = object.filterByCommitment ?? undefined;
    return message;
  },
};

function createBaseSubscribeRequestFilterTransactions(): SubscribeRequestFilterTransactions {
  return {
    vote: undefined,
    failed: undefined,
    signature: undefined,
    accountInclude: [],
    accountExclude: [],
    accountRequired: [],
  };
}

export const SubscribeRequestFilterTransactions = {
  encode(
    message: SubscribeRequestFilterTransactions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.vote !== undefined) {
      writer.uint32(8).bool(message.vote);
    }
    if (message.failed !== undefined) {
      writer.uint32(16).bool(message.failed);
    }
    if (message.signature !== undefined) {
      writer.uint32(42).string(message.signature);
    }
    for (const v of message.accountInclude) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.accountExclude) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.accountRequired) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterTransactions {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterTransactions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.vote = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.failed = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.signature = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accountInclude.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.accountExclude.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.accountRequired.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestFilterTransactions {
    return {
      vote: isSet(object.vote) ? globalThis.Boolean(object.vote) : undefined,
      failed: isSet(object.failed)
        ? globalThis.Boolean(object.failed)
        : undefined,
      signature: isSet(object.signature)
        ? globalThis.String(object.signature)
        : undefined,
      accountInclude: globalThis.Array.isArray(object?.accountInclude)
        ? object.accountInclude.map((e: any) => globalThis.String(e))
        : [],
      accountExclude: globalThis.Array.isArray(object?.accountExclude)
        ? object.accountExclude.map((e: any) => globalThis.String(e))
        : [],
      accountRequired: globalThis.Array.isArray(object?.accountRequired)
        ? object.accountRequired.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: SubscribeRequestFilterTransactions): unknown {
    const obj: any = {};
    if (message.vote !== undefined) {
      obj.vote = message.vote;
    }
    if (message.failed !== undefined) {
      obj.failed = message.failed;
    }
    if (message.signature !== undefined) {
      obj.signature = message.signature;
    }
    if (message.accountInclude?.length) {
      obj.accountInclude = message.accountInclude;
    }
    if (message.accountExclude?.length) {
      obj.accountExclude = message.accountExclude;
    }
    if (message.accountRequired?.length) {
      obj.accountRequired = message.accountRequired;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterTransactions>, I>>(
    base?: I
  ): SubscribeRequestFilterTransactions {
    return SubscribeRequestFilterTransactions.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequestFilterTransactions>, I>
  >(object: I): SubscribeRequestFilterTransactions {
    const message = createBaseSubscribeRequestFilterTransactions();
    message.vote = object.vote ?? undefined;
    message.failed = object.failed ?? undefined;
    message.signature = object.signature ?? undefined;
    message.accountInclude = object.accountInclude?.map((e) => e) || [];
    message.accountExclude = object.accountExclude?.map((e) => e) || [];
    message.accountRequired = object.accountRequired?.map((e) => e) || [];
    return message;
  },
};

function createBaseSubscribeRequestFilterBlocks(): SubscribeRequestFilterBlocks {
  return {
    accountInclude: [],
    includeTransactions: undefined,
    includeAccounts: undefined,
    includeEntries: undefined,
  };
}

export const SubscribeRequestFilterBlocks = {
  encode(
    message: SubscribeRequestFilterBlocks,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.accountInclude) {
      writer.uint32(10).string(v!);
    }
    if (message.includeTransactions !== undefined) {
      writer.uint32(16).bool(message.includeTransactions);
    }
    if (message.includeAccounts !== undefined) {
      writer.uint32(24).bool(message.includeAccounts);
    }
    if (message.includeEntries !== undefined) {
      writer.uint32(32).bool(message.includeEntries);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterBlocks {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterBlocks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountInclude.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.includeTransactions = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.includeAccounts = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.includeEntries = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestFilterBlocks {
    return {
      accountInclude: globalThis.Array.isArray(object?.accountInclude)
        ? object.accountInclude.map((e: any) => globalThis.String(e))
        : [],
      includeTransactions: isSet(object.includeTransactions)
        ? globalThis.Boolean(object.includeTransactions)
        : undefined,
      includeAccounts: isSet(object.includeAccounts)
        ? globalThis.Boolean(object.includeAccounts)
        : undefined,
      includeEntries: isSet(object.includeEntries)
        ? globalThis.Boolean(object.includeEntries)
        : undefined,
    };
  },

  toJSON(message: SubscribeRequestFilterBlocks): unknown {
    const obj: any = {};
    if (message.accountInclude?.length) {
      obj.accountInclude = message.accountInclude;
    }
    if (message.includeTransactions !== undefined) {
      obj.includeTransactions = message.includeTransactions;
    }
    if (message.includeAccounts !== undefined) {
      obj.includeAccounts = message.includeAccounts;
    }
    if (message.includeEntries !== undefined) {
      obj.includeEntries = message.includeEntries;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterBlocks>, I>>(
    base?: I
  ): SubscribeRequestFilterBlocks {
    return SubscribeRequestFilterBlocks.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequestFilterBlocks>, I>>(
    object: I
  ): SubscribeRequestFilterBlocks {
    const message = createBaseSubscribeRequestFilterBlocks();
    message.accountInclude = object.accountInclude?.map((e) => e) || [];
    message.includeTransactions = object.includeTransactions ?? undefined;
    message.includeAccounts = object.includeAccounts ?? undefined;
    message.includeEntries = object.includeEntries ?? undefined;
    return message;
  },
};

function createBaseSubscribeRequestFilterBlocksMeta(): SubscribeRequestFilterBlocksMeta {
  return {};
}

export const SubscribeRequestFilterBlocksMeta = {
  encode(
    _: SubscribeRequestFilterBlocksMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterBlocksMeta {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterBlocksMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SubscribeRequestFilterBlocksMeta {
    return {};
  },

  toJSON(_: SubscribeRequestFilterBlocksMeta): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterBlocksMeta>, I>>(
    base?: I
  ): SubscribeRequestFilterBlocksMeta {
    return SubscribeRequestFilterBlocksMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequestFilterBlocksMeta>, I>
  >(_: I): SubscribeRequestFilterBlocksMeta {
    const message = createBaseSubscribeRequestFilterBlocksMeta();
    return message;
  },
};

function createBaseSubscribeRequestFilterEntry(): SubscribeRequestFilterEntry {
  return {};
}

export const SubscribeRequestFilterEntry = {
  encode(
    _: SubscribeRequestFilterEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestFilterEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestFilterEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SubscribeRequestFilterEntry {
    return {};
  },

  toJSON(_: SubscribeRequestFilterEntry): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestFilterEntry>, I>>(
    base?: I
  ): SubscribeRequestFilterEntry {
    return SubscribeRequestFilterEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequestFilterEntry>, I>>(
    _: I
  ): SubscribeRequestFilterEntry {
    const message = createBaseSubscribeRequestFilterEntry();
    return message;
  },
};

function createBaseSubscribeRequestAccountsDataSlice(): SubscribeRequestAccountsDataSlice {
  return { offset: "0", length: "0" };
}

export const SubscribeRequestAccountsDataSlice = {
  encode(
    message: SubscribeRequestAccountsDataSlice,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.offset !== "0") {
      writer.uint32(8).uint64(message.offset);
    }
    if (message.length !== "0") {
      writer.uint32(16).uint64(message.length);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestAccountsDataSlice {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestAccountsDataSlice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.offset = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.length = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestAccountsDataSlice {
    return {
      offset: isSet(object.offset) ? globalThis.String(object.offset) : "0",
      length: isSet(object.length) ? globalThis.String(object.length) : "0",
    };
  },

  toJSON(message: SubscribeRequestAccountsDataSlice): unknown {
    const obj: any = {};
    if (message.offset !== "0") {
      obj.offset = message.offset;
    }
    if (message.length !== "0") {
      obj.length = message.length;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestAccountsDataSlice>, I>>(
    base?: I
  ): SubscribeRequestAccountsDataSlice {
    return SubscribeRequestAccountsDataSlice.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<SubscribeRequestAccountsDataSlice>, I>
  >(object: I): SubscribeRequestAccountsDataSlice {
    const message = createBaseSubscribeRequestAccountsDataSlice();
    message.offset = object.offset ?? "0";
    message.length = object.length ?? "0";
    return message;
  },
};

function createBaseSubscribeRequestPing(): SubscribeRequestPing {
  return { id: 0 };
}

export const SubscribeRequestPing = {
  encode(
    message: SubscribeRequestPing,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeRequestPing {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeRequestPing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeRequestPing {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: SubscribeRequestPing): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeRequestPing>, I>>(
    base?: I
  ): SubscribeRequestPing {
    return SubscribeRequestPing.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeRequestPing>, I>>(
    object: I
  ): SubscribeRequestPing {
    const message = createBaseSubscribeRequestPing();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseSubscribeUpdate(): SubscribeUpdate {
  return {
    filters: [],
    account: undefined,
    slot: undefined,
    transaction: undefined,
    block: undefined,
    ping: undefined,
    pong: undefined,
    blockMeta: undefined,
    entry: undefined,
  };
}

export const SubscribeUpdate = {
  encode(
    message: SubscribeUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.filters) {
      writer.uint32(10).string(v!);
    }
    if (message.account !== undefined) {
      SubscribeUpdateAccount.encode(
        message.account,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.slot !== undefined) {
      SubscribeUpdateSlot.encode(
        message.slot,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.transaction !== undefined) {
      SubscribeUpdateTransaction.encode(
        message.transaction,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.block !== undefined) {
      SubscribeUpdateBlock.encode(
        message.block,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.ping !== undefined) {
      SubscribeUpdatePing.encode(
        message.ping,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.pong !== undefined) {
      SubscribeUpdatePong.encode(
        message.pong,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.blockMeta !== undefined) {
      SubscribeUpdateBlockMeta.encode(
        message.blockMeta,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.entry !== undefined) {
      SubscribeUpdateEntry.encode(
        message.entry,
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeUpdate {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filters.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account = SubscribeUpdateAccount.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slot = SubscribeUpdateSlot.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.transaction = SubscribeUpdateTransaction.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.block = SubscribeUpdateBlock.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ping = SubscribeUpdatePing.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.pong = SubscribeUpdatePong.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.blockMeta = SubscribeUpdateBlockMeta.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.entry = SubscribeUpdateEntry.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdate {
    return {
      filters: globalThis.Array.isArray(object?.filters)
        ? object.filters.map((e: any) => globalThis.String(e))
        : [],
      account: isSet(object.account)
        ? SubscribeUpdateAccount.fromJSON(object.account)
        : undefined,
      slot: isSet(object.slot)
        ? SubscribeUpdateSlot.fromJSON(object.slot)
        : undefined,
      transaction: isSet(object.transaction)
        ? SubscribeUpdateTransaction.fromJSON(object.transaction)
        : undefined,
      block: isSet(object.block)
        ? SubscribeUpdateBlock.fromJSON(object.block)
        : undefined,
      ping: isSet(object.ping)
        ? SubscribeUpdatePing.fromJSON(object.ping)
        : undefined,
      pong: isSet(object.pong)
        ? SubscribeUpdatePong.fromJSON(object.pong)
        : undefined,
      blockMeta: isSet(object.blockMeta)
        ? SubscribeUpdateBlockMeta.fromJSON(object.blockMeta)
        : undefined,
      entry: isSet(object.entry)
        ? SubscribeUpdateEntry.fromJSON(object.entry)
        : undefined,
    };
  },

  toJSON(message: SubscribeUpdate): unknown {
    const obj: any = {};
    if (message.filters?.length) {
      obj.filters = message.filters;
    }
    if (message.account !== undefined) {
      obj.account = SubscribeUpdateAccount.toJSON(message.account);
    }
    if (message.slot !== undefined) {
      obj.slot = SubscribeUpdateSlot.toJSON(message.slot);
    }
    if (message.transaction !== undefined) {
      obj.transaction = SubscribeUpdateTransaction.toJSON(message.transaction);
    }
    if (message.block !== undefined) {
      obj.block = SubscribeUpdateBlock.toJSON(message.block);
    }
    if (message.ping !== undefined) {
      obj.ping = SubscribeUpdatePing.toJSON(message.ping);
    }
    if (message.pong !== undefined) {
      obj.pong = SubscribeUpdatePong.toJSON(message.pong);
    }
    if (message.blockMeta !== undefined) {
      obj.blockMeta = SubscribeUpdateBlockMeta.toJSON(message.blockMeta);
    }
    if (message.entry !== undefined) {
      obj.entry = SubscribeUpdateEntry.toJSON(message.entry);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdate>, I>>(
    base?: I
  ): SubscribeUpdate {
    return SubscribeUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdate>, I>>(
    object: I
  ): SubscribeUpdate {
    const message = createBaseSubscribeUpdate();
    message.filters = object.filters?.map((e) => e) || [];
    message.account =
      object.account !== undefined && object.account !== null
        ? SubscribeUpdateAccount.fromPartial(object.account)
        : undefined;
    message.slot =
      object.slot !== undefined && object.slot !== null
        ? SubscribeUpdateSlot.fromPartial(object.slot)
        : undefined;
    message.transaction =
      object.transaction !== undefined && object.transaction !== null
        ? SubscribeUpdateTransaction.fromPartial(object.transaction)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? SubscribeUpdateBlock.fromPartial(object.block)
        : undefined;
    message.ping =
      object.ping !== undefined && object.ping !== null
        ? SubscribeUpdatePing.fromPartial(object.ping)
        : undefined;
    message.pong =
      object.pong !== undefined && object.pong !== null
        ? SubscribeUpdatePong.fromPartial(object.pong)
        : undefined;
    message.blockMeta =
      object.blockMeta !== undefined && object.blockMeta !== null
        ? SubscribeUpdateBlockMeta.fromPartial(object.blockMeta)
        : undefined;
    message.entry =
      object.entry !== undefined && object.entry !== null
        ? SubscribeUpdateEntry.fromPartial(object.entry)
        : undefined;
    return message;
  },
};

function createBaseSubscribeUpdateAccount(): SubscribeUpdateAccount {
  return { account: undefined, slot: "0", isStartup: false };
}

export const SubscribeUpdateAccount = {
  encode(
    message: SubscribeUpdateAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== undefined) {
      SubscribeUpdateAccountInfo.encode(
        message.account,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.slot !== "0") {
      writer.uint32(16).uint64(message.slot);
    }
    if (message.isStartup === true) {
      writer.uint32(24).bool(message.isStartup);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateAccount {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = SubscribeUpdateAccountInfo.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isStartup = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateAccount {
    return {
      account: isSet(object.account)
        ? SubscribeUpdateAccountInfo.fromJSON(object.account)
        : undefined,
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      isStartup: isSet(object.isStartup)
        ? globalThis.Boolean(object.isStartup)
        : false,
    };
  },

  toJSON(message: SubscribeUpdateAccount): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = SubscribeUpdateAccountInfo.toJSON(message.account);
    }
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.isStartup === true) {
      obj.isStartup = message.isStartup;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateAccount>, I>>(
    base?: I
  ): SubscribeUpdateAccount {
    return SubscribeUpdateAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateAccount>, I>>(
    object: I
  ): SubscribeUpdateAccount {
    const message = createBaseSubscribeUpdateAccount();
    message.account =
      object.account !== undefined && object.account !== null
        ? SubscribeUpdateAccountInfo.fromPartial(object.account)
        : undefined;
    message.slot = object.slot ?? "0";
    message.isStartup = object.isStartup ?? false;
    return message;
  },
};

function createBaseSubscribeUpdateAccountInfo(): SubscribeUpdateAccountInfo {
  return {
    pubkey: new Uint8Array(0),
    lamports: "0",
    owner: new Uint8Array(0),
    executable: false,
    rentEpoch: "0",
    data: new Uint8Array(0),
    writeVersion: "0",
    txnSignature: undefined,
  };
}

export const SubscribeUpdateAccountInfo = {
  encode(
    message: SubscribeUpdateAccountInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pubkey.length !== 0) {
      writer.uint32(10).bytes(message.pubkey);
    }
    if (message.lamports !== "0") {
      writer.uint32(16).uint64(message.lamports);
    }
    if (message.owner.length !== 0) {
      writer.uint32(26).bytes(message.owner);
    }
    if (message.executable === true) {
      writer.uint32(32).bool(message.executable);
    }
    if (message.rentEpoch !== "0") {
      writer.uint32(40).uint64(message.rentEpoch);
    }
    if (message.data.length !== 0) {
      writer.uint32(50).bytes(message.data);
    }
    if (message.writeVersion !== "0") {
      writer.uint32(56).uint64(message.writeVersion);
    }
    if (message.txnSignature !== undefined) {
      writer.uint32(66).bytes(message.txnSignature);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateAccountInfo {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateAccountInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pubkey = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lamports = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.executable = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.rentEpoch = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.writeVersion = longToString(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.txnSignature = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateAccountInfo {
    return {
      pubkey: isSet(object.pubkey)
        ? bytesFromBase64(object.pubkey)
        : new Uint8Array(0),
      lamports: isSet(object.lamports)
        ? globalThis.String(object.lamports)
        : "0",
      owner: isSet(object.owner)
        ? bytesFromBase64(object.owner)
        : new Uint8Array(0),
      executable: isSet(object.executable)
        ? globalThis.Boolean(object.executable)
        : false,
      rentEpoch: isSet(object.rentEpoch)
        ? globalThis.String(object.rentEpoch)
        : "0",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(0),
      writeVersion: isSet(object.writeVersion)
        ? globalThis.String(object.writeVersion)
        : "0",
      txnSignature: isSet(object.txnSignature)
        ? bytesFromBase64(object.txnSignature)
        : undefined,
    };
  },

  toJSON(message: SubscribeUpdateAccountInfo): unknown {
    const obj: any = {};
    if (message.pubkey.length !== 0) {
      obj.pubkey = base64FromBytes(message.pubkey);
    }
    if (message.lamports !== "0") {
      obj.lamports = message.lamports;
    }
    if (message.owner.length !== 0) {
      obj.owner = base64FromBytes(message.owner);
    }
    if (message.executable === true) {
      obj.executable = message.executable;
    }
    if (message.rentEpoch !== "0") {
      obj.rentEpoch = message.rentEpoch;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.writeVersion !== "0") {
      obj.writeVersion = message.writeVersion;
    }
    if (message.txnSignature !== undefined) {
      obj.txnSignature = base64FromBytes(message.txnSignature);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateAccountInfo>, I>>(
    base?: I
  ): SubscribeUpdateAccountInfo {
    return SubscribeUpdateAccountInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateAccountInfo>, I>>(
    object: I
  ): SubscribeUpdateAccountInfo {
    const message = createBaseSubscribeUpdateAccountInfo();
    message.pubkey = object.pubkey ?? new Uint8Array(0);
    message.lamports = object.lamports ?? "0";
    message.owner = object.owner ?? new Uint8Array(0);
    message.executable = object.executable ?? false;
    message.rentEpoch = object.rentEpoch ?? "0";
    message.data = object.data ?? new Uint8Array(0);
    message.writeVersion = object.writeVersion ?? "0";
    message.txnSignature = object.txnSignature ?? undefined;
    return message;
  },
};

function createBaseSubscribeUpdateSlot(): SubscribeUpdateSlot {
  return { slot: "0", parent: undefined, status: 0 };
}

export const SubscribeUpdateSlot = {
  encode(
    message: SubscribeUpdateSlot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.parent !== undefined) {
      writer.uint32(16).uint64(message.parent);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeUpdateSlot {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateSlot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.parent = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateSlot {
    return {
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      parent: isSet(object.parent)
        ? globalThis.String(object.parent)
        : undefined,
      status: isSet(object.status) ? commitmentLevelFromJSON(object.status) : 0,
    };
  },

  toJSON(message: SubscribeUpdateSlot): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.parent !== undefined) {
      obj.parent = message.parent;
    }
    if (message.status !== 0) {
      obj.status = commitmentLevelToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateSlot>, I>>(
    base?: I
  ): SubscribeUpdateSlot {
    return SubscribeUpdateSlot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateSlot>, I>>(
    object: I
  ): SubscribeUpdateSlot {
    const message = createBaseSubscribeUpdateSlot();
    message.slot = object.slot ?? "0";
    message.parent = object.parent ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseSubscribeUpdateTransaction(): SubscribeUpdateTransaction {
  return { transaction: undefined, slot: "0" };
}

export const SubscribeUpdateTransaction = {
  encode(
    message: SubscribeUpdateTransaction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.transaction !== undefined) {
      SubscribeUpdateTransactionInfo.encode(
        message.transaction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.slot !== "0") {
      writer.uint32(16).uint64(message.slot);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateTransaction {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.transaction = SubscribeUpdateTransactionInfo.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateTransaction {
    return {
      transaction: isSet(object.transaction)
        ? SubscribeUpdateTransactionInfo.fromJSON(object.transaction)
        : undefined,
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
    };
  },

  toJSON(message: SubscribeUpdateTransaction): unknown {
    const obj: any = {};
    if (message.transaction !== undefined) {
      obj.transaction = SubscribeUpdateTransactionInfo.toJSON(
        message.transaction
      );
    }
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateTransaction>, I>>(
    base?: I
  ): SubscribeUpdateTransaction {
    return SubscribeUpdateTransaction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateTransaction>, I>>(
    object: I
  ): SubscribeUpdateTransaction {
    const message = createBaseSubscribeUpdateTransaction();
    message.transaction =
      object.transaction !== undefined && object.transaction !== null
        ? SubscribeUpdateTransactionInfo.fromPartial(object.transaction)
        : undefined;
    message.slot = object.slot ?? "0";
    return message;
  },
};

function createBaseSubscribeUpdateTransactionInfo(): SubscribeUpdateTransactionInfo {
  return {
    signature: new Uint8Array(0),
    isVote: false,
    transaction: undefined,
    meta: undefined,
    index: "0",
  };
}

export const SubscribeUpdateTransactionInfo = {
  encode(
    message: SubscribeUpdateTransactionInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.signature.length !== 0) {
      writer.uint32(10).bytes(message.signature);
    }
    if (message.isVote === true) {
      writer.uint32(16).bool(message.isVote);
    }
    if (message.transaction !== undefined) {
      Transaction.encode(
        message.transaction,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.meta !== undefined) {
      TransactionStatusMeta.encode(
        message.meta,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.index !== "0") {
      writer.uint32(40).uint64(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateTransactionInfo {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateTransactionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isVote = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transaction = Transaction.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.meta = TransactionStatusMeta.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.index = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateTransactionInfo {
    return {
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(0),
      isVote: isSet(object.isVote) ? globalThis.Boolean(object.isVote) : false,
      transaction: isSet(object.transaction)
        ? Transaction.fromJSON(object.transaction)
        : undefined,
      meta: isSet(object.meta)
        ? TransactionStatusMeta.fromJSON(object.meta)
        : undefined,
      index: isSet(object.index) ? globalThis.String(object.index) : "0",
    };
  },

  toJSON(message: SubscribeUpdateTransactionInfo): unknown {
    const obj: any = {};
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.isVote === true) {
      obj.isVote = message.isVote;
    }
    if (message.transaction !== undefined) {
      obj.transaction = Transaction.toJSON(message.transaction);
    }
    if (message.meta !== undefined) {
      obj.meta = TransactionStatusMeta.toJSON(message.meta);
    }
    if (message.index !== "0") {
      obj.index = message.index;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateTransactionInfo>, I>>(
    base?: I
  ): SubscribeUpdateTransactionInfo {
    return SubscribeUpdateTransactionInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateTransactionInfo>, I>>(
    object: I
  ): SubscribeUpdateTransactionInfo {
    const message = createBaseSubscribeUpdateTransactionInfo();
    message.signature = object.signature ?? new Uint8Array(0);
    message.isVote = object.isVote ?? false;
    message.transaction =
      object.transaction !== undefined && object.transaction !== null
        ? Transaction.fromPartial(object.transaction)
        : undefined;
    message.meta =
      object.meta !== undefined && object.meta !== null
        ? TransactionStatusMeta.fromPartial(object.meta)
        : undefined;
    message.index = object.index ?? "0";
    return message;
  },
};

function createBaseSubscribeUpdateBlock(): SubscribeUpdateBlock {
  return {
    slot: "0",
    blockhash: "",
    rewards: undefined,
    blockTime: undefined,
    blockHeight: undefined,
    parentSlot: "0",
    parentBlockhash: "",
    executedTransactionCount: "0",
    transactions: [],
    updatedAccountCount: "0",
    accounts: [],
    entriesCount: "0",
    entries: [],
  };
}

export const SubscribeUpdateBlock = {
  encode(
    message: SubscribeUpdateBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.blockhash !== "") {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.rewards !== undefined) {
      Rewards.encode(message.rewards, writer.uint32(26).fork()).ldelim();
    }
    if (message.blockTime !== undefined) {
      UnixTimestamp.encode(
        message.blockTime,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.blockHeight !== undefined) {
      BlockHeight.encode(
        message.blockHeight,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.parentSlot !== "0") {
      writer.uint32(56).uint64(message.parentSlot);
    }
    if (message.parentBlockhash !== "") {
      writer.uint32(66).string(message.parentBlockhash);
    }
    if (message.executedTransactionCount !== "0") {
      writer.uint32(72).uint64(message.executedTransactionCount);
    }
    for (const v of message.transactions) {
      SubscribeUpdateTransactionInfo.encode(
        v!,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.updatedAccountCount !== "0") {
      writer.uint32(80).uint64(message.updatedAccountCount);
    }
    for (const v of message.accounts) {
      SubscribeUpdateAccountInfo.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.entriesCount !== "0") {
      writer.uint32(96).uint64(message.entriesCount);
    }
    for (const v of message.entries) {
      SubscribeUpdateEntry.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateBlock {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blockhash = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rewards = Rewards.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.blockTime = UnixTimestamp.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.blockHeight = BlockHeight.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.parentSlot = longToString(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.parentBlockhash = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.executedTransactionCount = longToString(
            reader.uint64() as Long
          );
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.transactions.push(
            SubscribeUpdateTransactionInfo.decode(reader, reader.uint32())
          );
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.updatedAccountCount = longToString(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.accounts.push(
            SubscribeUpdateAccountInfo.decode(reader, reader.uint32())
          );
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.entriesCount = longToString(reader.uint64() as Long);
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.entries.push(
            SubscribeUpdateEntry.decode(reader, reader.uint32())
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateBlock {
    return {
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      blockhash: isSet(object.blockhash)
        ? globalThis.String(object.blockhash)
        : "",
      rewards: isSet(object.rewards)
        ? Rewards.fromJSON(object.rewards)
        : undefined,
      blockTime: isSet(object.blockTime)
        ? UnixTimestamp.fromJSON(object.blockTime)
        : undefined,
      blockHeight: isSet(object.blockHeight)
        ? BlockHeight.fromJSON(object.blockHeight)
        : undefined,
      parentSlot: isSet(object.parentSlot)
        ? globalThis.String(object.parentSlot)
        : "0",
      parentBlockhash: isSet(object.parentBlockhash)
        ? globalThis.String(object.parentBlockhash)
        : "",
      executedTransactionCount: isSet(object.executedTransactionCount)
        ? globalThis.String(object.executedTransactionCount)
        : "0",
      transactions: globalThis.Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) =>
            SubscribeUpdateTransactionInfo.fromJSON(e)
          )
        : [],
      updatedAccountCount: isSet(object.updatedAccountCount)
        ? globalThis.String(object.updatedAccountCount)
        : "0",
      accounts: globalThis.Array.isArray(object?.accounts)
        ? object.accounts.map((e: any) =>
            SubscribeUpdateAccountInfo.fromJSON(e)
          )
        : [],
      entriesCount: isSet(object.entriesCount)
        ? globalThis.String(object.entriesCount)
        : "0",
      entries: globalThis.Array.isArray(object?.entries)
        ? object.entries.map((e: any) => SubscribeUpdateEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SubscribeUpdateBlock): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.blockhash !== "") {
      obj.blockhash = message.blockhash;
    }
    if (message.rewards !== undefined) {
      obj.rewards = Rewards.toJSON(message.rewards);
    }
    if (message.blockTime !== undefined) {
      obj.blockTime = UnixTimestamp.toJSON(message.blockTime);
    }
    if (message.blockHeight !== undefined) {
      obj.blockHeight = BlockHeight.toJSON(message.blockHeight);
    }
    if (message.parentSlot !== "0") {
      obj.parentSlot = message.parentSlot;
    }
    if (message.parentBlockhash !== "") {
      obj.parentBlockhash = message.parentBlockhash;
    }
    if (message.executedTransactionCount !== "0") {
      obj.executedTransactionCount = message.executedTransactionCount;
    }
    if (message.transactions?.length) {
      obj.transactions = message.transactions.map((e) =>
        SubscribeUpdateTransactionInfo.toJSON(e)
      );
    }
    if (message.updatedAccountCount !== "0") {
      obj.updatedAccountCount = message.updatedAccountCount;
    }
    if (message.accounts?.length) {
      obj.accounts = message.accounts.map((e) =>
        SubscribeUpdateAccountInfo.toJSON(e)
      );
    }
    if (message.entriesCount !== "0") {
      obj.entriesCount = message.entriesCount;
    }
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => SubscribeUpdateEntry.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateBlock>, I>>(
    base?: I
  ): SubscribeUpdateBlock {
    return SubscribeUpdateBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateBlock>, I>>(
    object: I
  ): SubscribeUpdateBlock {
    const message = createBaseSubscribeUpdateBlock();
    message.slot = object.slot ?? "0";
    message.blockhash = object.blockhash ?? "";
    message.rewards =
      object.rewards !== undefined && object.rewards !== null
        ? Rewards.fromPartial(object.rewards)
        : undefined;
    message.blockTime =
      object.blockTime !== undefined && object.blockTime !== null
        ? UnixTimestamp.fromPartial(object.blockTime)
        : undefined;
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? BlockHeight.fromPartial(object.blockHeight)
        : undefined;
    message.parentSlot = object.parentSlot ?? "0";
    message.parentBlockhash = object.parentBlockhash ?? "";
    message.executedTransactionCount = object.executedTransactionCount ?? "0";
    message.transactions =
      object.transactions?.map((e) =>
        SubscribeUpdateTransactionInfo.fromPartial(e)
      ) || [];
    message.updatedAccountCount = object.updatedAccountCount ?? "0";
    message.accounts =
      object.accounts?.map((e) => SubscribeUpdateAccountInfo.fromPartial(e)) ||
      [];
    message.entriesCount = object.entriesCount ?? "0";
    message.entries =
      object.entries?.map((e) => SubscribeUpdateEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSubscribeUpdateBlockMeta(): SubscribeUpdateBlockMeta {
  return {
    slot: "0",
    blockhash: "",
    rewards: undefined,
    blockTime: undefined,
    blockHeight: undefined,
    parentSlot: "0",
    parentBlockhash: "",
    executedTransactionCount: "0",
  };
}

export const SubscribeUpdateBlockMeta = {
  encode(
    message: SubscribeUpdateBlockMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.blockhash !== "") {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.rewards !== undefined) {
      Rewards.encode(message.rewards, writer.uint32(26).fork()).ldelim();
    }
    if (message.blockTime !== undefined) {
      UnixTimestamp.encode(
        message.blockTime,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.blockHeight !== undefined) {
      BlockHeight.encode(
        message.blockHeight,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.parentSlot !== "0") {
      writer.uint32(48).uint64(message.parentSlot);
    }
    if (message.parentBlockhash !== "") {
      writer.uint32(58).string(message.parentBlockhash);
    }
    if (message.executedTransactionCount !== "0") {
      writer.uint32(64).uint64(message.executedTransactionCount);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateBlockMeta {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateBlockMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blockhash = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rewards = Rewards.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.blockTime = UnixTimestamp.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.blockHeight = BlockHeight.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.parentSlot = longToString(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.parentBlockhash = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.executedTransactionCount = longToString(
            reader.uint64() as Long
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateBlockMeta {
    return {
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      blockhash: isSet(object.blockhash)
        ? globalThis.String(object.blockhash)
        : "",
      rewards: isSet(object.rewards)
        ? Rewards.fromJSON(object.rewards)
        : undefined,
      blockTime: isSet(object.blockTime)
        ? UnixTimestamp.fromJSON(object.blockTime)
        : undefined,
      blockHeight: isSet(object.blockHeight)
        ? BlockHeight.fromJSON(object.blockHeight)
        : undefined,
      parentSlot: isSet(object.parentSlot)
        ? globalThis.String(object.parentSlot)
        : "0",
      parentBlockhash: isSet(object.parentBlockhash)
        ? globalThis.String(object.parentBlockhash)
        : "",
      executedTransactionCount: isSet(object.executedTransactionCount)
        ? globalThis.String(object.executedTransactionCount)
        : "0",
    };
  },

  toJSON(message: SubscribeUpdateBlockMeta): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.blockhash !== "") {
      obj.blockhash = message.blockhash;
    }
    if (message.rewards !== undefined) {
      obj.rewards = Rewards.toJSON(message.rewards);
    }
    if (message.blockTime !== undefined) {
      obj.blockTime = UnixTimestamp.toJSON(message.blockTime);
    }
    if (message.blockHeight !== undefined) {
      obj.blockHeight = BlockHeight.toJSON(message.blockHeight);
    }
    if (message.parentSlot !== "0") {
      obj.parentSlot = message.parentSlot;
    }
    if (message.parentBlockhash !== "") {
      obj.parentBlockhash = message.parentBlockhash;
    }
    if (message.executedTransactionCount !== "0") {
      obj.executedTransactionCount = message.executedTransactionCount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateBlockMeta>, I>>(
    base?: I
  ): SubscribeUpdateBlockMeta {
    return SubscribeUpdateBlockMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateBlockMeta>, I>>(
    object: I
  ): SubscribeUpdateBlockMeta {
    const message = createBaseSubscribeUpdateBlockMeta();
    message.slot = object.slot ?? "0";
    message.blockhash = object.blockhash ?? "";
    message.rewards =
      object.rewards !== undefined && object.rewards !== null
        ? Rewards.fromPartial(object.rewards)
        : undefined;
    message.blockTime =
      object.blockTime !== undefined && object.blockTime !== null
        ? UnixTimestamp.fromPartial(object.blockTime)
        : undefined;
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? BlockHeight.fromPartial(object.blockHeight)
        : undefined;
    message.parentSlot = object.parentSlot ?? "0";
    message.parentBlockhash = object.parentBlockhash ?? "";
    message.executedTransactionCount = object.executedTransactionCount ?? "0";
    return message;
  },
};

function createBaseSubscribeUpdateEntry(): SubscribeUpdateEntry {
  return {
    slot: "0",
    index: "0",
    numHashes: "0",
    hash: new Uint8Array(0),
    executedTransactionCount: "0",
  };
}

export const SubscribeUpdateEntry = {
  encode(
    message: SubscribeUpdateEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.index !== "0") {
      writer.uint32(16).uint64(message.index);
    }
    if (message.numHashes !== "0") {
      writer.uint32(24).uint64(message.numHashes);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.executedTransactionCount !== "0") {
      writer.uint32(40).uint64(message.executedTransactionCount);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeUpdateEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdateEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.index = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numHashes = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.executedTransactionCount = longToString(
            reader.uint64() as Long
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdateEntry {
    return {
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      index: isSet(object.index) ? globalThis.String(object.index) : "0",
      numHashes: isSet(object.numHashes)
        ? globalThis.String(object.numHashes)
        : "0",
      hash: isSet(object.hash)
        ? bytesFromBase64(object.hash)
        : new Uint8Array(0),
      executedTransactionCount: isSet(object.executedTransactionCount)
        ? globalThis.String(object.executedTransactionCount)
        : "0",
    };
  },

  toJSON(message: SubscribeUpdateEntry): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.index !== "0") {
      obj.index = message.index;
    }
    if (message.numHashes !== "0") {
      obj.numHashes = message.numHashes;
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.executedTransactionCount !== "0") {
      obj.executedTransactionCount = message.executedTransactionCount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdateEntry>, I>>(
    base?: I
  ): SubscribeUpdateEntry {
    return SubscribeUpdateEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdateEntry>, I>>(
    object: I
  ): SubscribeUpdateEntry {
    const message = createBaseSubscribeUpdateEntry();
    message.slot = object.slot ?? "0";
    message.index = object.index ?? "0";
    message.numHashes = object.numHashes ?? "0";
    message.hash = object.hash ?? new Uint8Array(0);
    message.executedTransactionCount = object.executedTransactionCount ?? "0";
    return message;
  },
};

function createBaseSubscribeUpdatePing(): SubscribeUpdatePing {
  return {};
}

export const SubscribeUpdatePing = {
  encode(
    _: SubscribeUpdatePing,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeUpdatePing {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdatePing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): SubscribeUpdatePing {
    return {};
  },

  toJSON(_: SubscribeUpdatePing): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdatePing>, I>>(
    base?: I
  ): SubscribeUpdatePing {
    return SubscribeUpdatePing.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdatePing>, I>>(
    _: I
  ): SubscribeUpdatePing {
    const message = createBaseSubscribeUpdatePing();
    return message;
  },
};

function createBaseSubscribeUpdatePong(): SubscribeUpdatePong {
  return { id: 0 };
}

export const SubscribeUpdatePong = {
  encode(
    message: SubscribeUpdatePong,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscribeUpdatePong {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscribeUpdatePong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubscribeUpdatePong {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: SubscribeUpdatePong): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubscribeUpdatePong>, I>>(
    base?: I
  ): SubscribeUpdatePong {
    return SubscribeUpdatePong.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubscribeUpdatePong>, I>>(
    object: I
  ): SubscribeUpdatePong {
    const message = createBaseSubscribeUpdatePong();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBasePingRequest(): PingRequest {
  return { count: 0 };
}

export const PingRequest = {
  encode(
    message: PingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.count !== 0) {
      writer.uint32(8).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.count = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingRequest {
    return { count: isSet(object.count) ? globalThis.Number(object.count) : 0 };
  },

  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    if (message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PingRequest>, I>>(base?: I): PingRequest {
    return PingRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PingRequest>, I>>(
    object: I
  ): PingRequest {
    const message = createBasePingRequest();
    message.count = object.count ?? 0;
    return message;
  },
};

function createBasePongResponse(): PongResponse {
  return { count: 0 };
}

export const PongResponse = {
  encode(
    message: PongResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.count !== 0) {
      writer.uint32(8).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PongResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePongResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.count = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PongResponse {
    return { count: isSet(object.count) ? globalThis.Number(object.count) : 0 };
  },

  toJSON(message: PongResponse): unknown {
    const obj: any = {};
    if (message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PongResponse>, I>>(
    base?: I
  ): PongResponse {
    return PongResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PongResponse>, I>>(
    object: I
  ): PongResponse {
    const message = createBasePongResponse();
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseGetLatestBlockhashRequest(): GetLatestBlockhashRequest {
  return { commitment: undefined };
}

export const GetLatestBlockhashRequest = {
  encode(
    message: GetLatestBlockhashRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commitment !== undefined) {
      writer.uint32(8).int32(message.commitment);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLatestBlockhashRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestBlockhashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.commitment = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLatestBlockhashRequest {
    return {
      commitment: isSet(object.commitment)
        ? commitmentLevelFromJSON(object.commitment)
        : undefined,
    };
  },

  toJSON(message: GetLatestBlockhashRequest): unknown {
    const obj: any = {};
    if (message.commitment !== undefined) {
      obj.commitment = commitmentLevelToJSON(message.commitment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLatestBlockhashRequest>, I>>(
    base?: I
  ): GetLatestBlockhashRequest {
    return GetLatestBlockhashRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLatestBlockhashRequest>, I>>(
    object: I
  ): GetLatestBlockhashRequest {
    const message = createBaseGetLatestBlockhashRequest();
    message.commitment = object.commitment ?? undefined;
    return message;
  },
};

function createBaseGetLatestBlockhashResponse(): GetLatestBlockhashResponse {
  return { slot: "0", blockhash: "", lastValidBlockHeight: "0" };
}

export const GetLatestBlockhashResponse = {
  encode(
    message: GetLatestBlockhashResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.blockhash !== "") {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.lastValidBlockHeight !== "0") {
      writer.uint32(24).uint64(message.lastValidBlockHeight);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLatestBlockhashResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestBlockhashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blockhash = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lastValidBlockHeight = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLatestBlockhashResponse {
    return {
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      blockhash: isSet(object.blockhash)
        ? globalThis.String(object.blockhash)
        : "",
      lastValidBlockHeight: isSet(object.lastValidBlockHeight)
        ? globalThis.String(object.lastValidBlockHeight)
        : "0",
    };
  },

  toJSON(message: GetLatestBlockhashResponse): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.blockhash !== "") {
      obj.blockhash = message.blockhash;
    }
    if (message.lastValidBlockHeight !== "0") {
      obj.lastValidBlockHeight = message.lastValidBlockHeight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetLatestBlockhashResponse>, I>>(
    base?: I
  ): GetLatestBlockhashResponse {
    return GetLatestBlockhashResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetLatestBlockhashResponse>, I>>(
    object: I
  ): GetLatestBlockhashResponse {
    const message = createBaseGetLatestBlockhashResponse();
    message.slot = object.slot ?? "0";
    message.blockhash = object.blockhash ?? "";
    message.lastValidBlockHeight = object.lastValidBlockHeight ?? "0";
    return message;
  },
};

function createBaseGetBlockHeightRequest(): GetBlockHeightRequest {
  return { commitment: undefined };
}

export const GetBlockHeightRequest = {
  encode(
    message: GetBlockHeightRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commitment !== undefined) {
      writer.uint32(8).int32(message.commitment);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBlockHeightRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.commitment = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockHeightRequest {
    return {
      commitment: isSet(object.commitment)
        ? commitmentLevelFromJSON(object.commitment)
        : undefined,
    };
  },

  toJSON(message: GetBlockHeightRequest): unknown {
    const obj: any = {};
    if (message.commitment !== undefined) {
      obj.commitment = commitmentLevelToJSON(message.commitment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBlockHeightRequest>, I>>(
    base?: I
  ): GetBlockHeightRequest {
    return GetBlockHeightRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBlockHeightRequest>, I>>(
    object: I
  ): GetBlockHeightRequest {
    const message = createBaseGetBlockHeightRequest();
    message.commitment = object.commitment ?? undefined;
    return message;
  },
};

function createBaseGetBlockHeightResponse(): GetBlockHeightResponse {
  return { blockHeight: "0" };
}

export const GetBlockHeightResponse = {
  encode(
    message: GetBlockHeightResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.blockHeight !== "0") {
      writer.uint32(8).uint64(message.blockHeight);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBlockHeightResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.blockHeight = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockHeightResponse {
    return {
      blockHeight: isSet(object.blockHeight)
        ? globalThis.String(object.blockHeight)
        : "0",
    };
  },

  toJSON(message: GetBlockHeightResponse): unknown {
    const obj: any = {};
    if (message.blockHeight !== "0") {
      obj.blockHeight = message.blockHeight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBlockHeightResponse>, I>>(
    base?: I
  ): GetBlockHeightResponse {
    return GetBlockHeightResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetBlockHeightResponse>, I>>(
    object: I
  ): GetBlockHeightResponse {
    const message = createBaseGetBlockHeightResponse();
    message.blockHeight = object.blockHeight ?? "0";
    return message;
  },
};

function createBaseGetSlotRequest(): GetSlotRequest {
  return { commitment: undefined };
}

export const GetSlotRequest = {
  encode(
    message: GetSlotRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commitment !== undefined) {
      writer.uint32(8).int32(message.commitment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSlotRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSlotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.commitment = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSlotRequest {
    return {
      commitment: isSet(object.commitment)
        ? commitmentLevelFromJSON(object.commitment)
        : undefined,
    };
  },

  toJSON(message: GetSlotRequest): unknown {
    const obj: any = {};
    if (message.commitment !== undefined) {
      obj.commitment = commitmentLevelToJSON(message.commitment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSlotRequest>, I>>(
    base?: I
  ): GetSlotRequest {
    return GetSlotRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSlotRequest>, I>>(
    object: I
  ): GetSlotRequest {
    const message = createBaseGetSlotRequest();
    message.commitment = object.commitment ?? undefined;
    return message;
  },
};

function createBaseGetSlotResponse(): GetSlotResponse {
  return { slot: "0" };
}

export const GetSlotResponse = {
  encode(
    message: GetSlotResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSlotResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSlotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSlotResponse {
    return { slot: isSet(object.slot) ? globalThis.String(object.slot) : "0" };
  },

  toJSON(message: GetSlotResponse): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSlotResponse>, I>>(
    base?: I
  ): GetSlotResponse {
    return GetSlotResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetSlotResponse>, I>>(
    object: I
  ): GetSlotResponse {
    const message = createBaseGetSlotResponse();
    message.slot = object.slot ?? "0";
    return message;
  },
};

function createBaseGetVersionRequest(): GetVersionRequest {
  return {};
}

export const GetVersionRequest = {
  encode(
    _: GetVersionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVersionRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): GetVersionRequest {
    return {};
  },

  toJSON(_: GetVersionRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVersionRequest>, I>>(
    base?: I
  ): GetVersionRequest {
    return GetVersionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetVersionRequest>, I>>(
    _: I
  ): GetVersionRequest {
    const message = createBaseGetVersionRequest();
    return message;
  },
};

function createBaseGetVersionResponse(): GetVersionResponse {
  return { version: "" };
}

export const GetVersionResponse = {
  encode(
    message: GetVersionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVersionResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetVersionResponse {
    return {
      version: isSet(object.version) ? globalThis.String(object.version) : "",
    };
  },

  toJSON(message: GetVersionResponse): unknown {
    const obj: any = {};
    if (message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVersionResponse>, I>>(
    base?: I
  ): GetVersionResponse {
    return GetVersionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetVersionResponse>, I>>(
    object: I
  ): GetVersionResponse {
    const message = createBaseGetVersionResponse();
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseIsBlockhashValidRequest(): IsBlockhashValidRequest {
  return { blockhash: "", commitment: undefined };
}

export const IsBlockhashValidRequest = {
  encode(
    message: IsBlockhashValidRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.blockhash !== "") {
      writer.uint32(10).string(message.blockhash);
    }
    if (message.commitment !== undefined) {
      writer.uint32(16).int32(message.commitment);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): IsBlockhashValidRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIsBlockhashValidRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.blockhash = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.commitment = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IsBlockhashValidRequest {
    return {
      blockhash: isSet(object.blockhash)
        ? globalThis.String(object.blockhash)
        : "",
      commitment: isSet(object.commitment)
        ? commitmentLevelFromJSON(object.commitment)
        : undefined,
    };
  },

  toJSON(message: IsBlockhashValidRequest): unknown {
    const obj: any = {};
    if (message.blockhash !== "") {
      obj.blockhash = message.blockhash;
    }
    if (message.commitment !== undefined) {
      obj.commitment = commitmentLevelToJSON(message.commitment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IsBlockhashValidRequest>, I>>(
    base?: I
  ): IsBlockhashValidRequest {
    return IsBlockhashValidRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IsBlockhashValidRequest>, I>>(
    object: I
  ): IsBlockhashValidRequest {
    const message = createBaseIsBlockhashValidRequest();
    message.blockhash = object.blockhash ?? "";
    message.commitment = object.commitment ?? undefined;
    return message;
  },
};

function createBaseIsBlockhashValidResponse(): IsBlockhashValidResponse {
  return { slot: "0", valid: false };
}

export const IsBlockhashValidResponse = {
  encode(
    message: IsBlockhashValidResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.slot !== "0") {
      writer.uint32(8).uint64(message.slot);
    }
    if (message.valid === true) {
      writer.uint32(16).bool(message.valid);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): IsBlockhashValidResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIsBlockhashValidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.valid = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IsBlockhashValidResponse {
    return {
      slot: isSet(object.slot) ? globalThis.String(object.slot) : "0",
      valid: isSet(object.valid) ? globalThis.Boolean(object.valid) : false,
    };
  },

  toJSON(message: IsBlockhashValidResponse): unknown {
    const obj: any = {};
    if (message.slot !== "0") {
      obj.slot = message.slot;
    }
    if (message.valid === true) {
      obj.valid = message.valid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IsBlockhashValidResponse>, I>>(
    base?: I
  ): IsBlockhashValidResponse {
    return IsBlockhashValidResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IsBlockhashValidResponse>, I>>(
    object: I
  ): IsBlockhashValidResponse {
    const message = createBaseIsBlockhashValidResponse();
    message.slot = object.slot ?? "0";
    message.valid = object.valid ?? false;
    return message;
  },
};

export type GeyserService = typeof GeyserService;
export const GeyserService = {
  subscribe: {
    path: "/geyser.Geyser/Subscribe",
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: SubscribeRequest) =>
      Buffer.from(SubscribeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubscribeRequest.decode(value),
    responseSerialize: (value: SubscribeUpdate) =>
      Buffer.from(SubscribeUpdate.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SubscribeUpdate.decode(value),
  },
  ping: {
    path: "/geyser.Geyser/Ping",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PingRequest) =>
      Buffer.from(PingRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PingRequest.decode(value),
    responseSerialize: (value: PongResponse) =>
      Buffer.from(PongResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PongResponse.decode(value),
  },
  getLatestBlockhash: {
    path: "/geyser.Geyser/GetLatestBlockhash",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetLatestBlockhashRequest) =>
      Buffer.from(GetLatestBlockhashRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      GetLatestBlockhashRequest.decode(value),
    responseSerialize: (value: GetLatestBlockhashResponse) =>
      Buffer.from(GetLatestBlockhashResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetLatestBlockhashResponse.decode(value),
  },
  getBlockHeight: {
    path: "/geyser.Geyser/GetBlockHeight",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetBlockHeightRequest) =>
      Buffer.from(GetBlockHeightRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetBlockHeightRequest.decode(value),
    responseSerialize: (value: GetBlockHeightResponse) =>
      Buffer.from(GetBlockHeightResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetBlockHeightResponse.decode(value),
  },
  getSlot: {
    path: "/geyser.Geyser/GetSlot",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetSlotRequest) =>
      Buffer.from(GetSlotRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetSlotRequest.decode(value),
    responseSerialize: (value: GetSlotResponse) =>
      Buffer.from(GetSlotResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetSlotResponse.decode(value),
  },
  isBlockhashValid: {
    path: "/geyser.Geyser/IsBlockhashValid",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: IsBlockhashValidRequest) =>
      Buffer.from(IsBlockhashValidRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      IsBlockhashValidRequest.decode(value),
    responseSerialize: (value: IsBlockhashValidResponse) =>
      Buffer.from(IsBlockhashValidResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      IsBlockhashValidResponse.decode(value),
  },
  getVersion: {
    path: "/geyser.Geyser/GetVersion",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetVersionRequest) =>
      Buffer.from(GetVersionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetVersionRequest.decode(value),
    responseSerialize: (value: GetVersionResponse) =>
      Buffer.from(GetVersionResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetVersionResponse.decode(value),
  },
} as const;

export interface GeyserServer extends UntypedServiceImplementation {
  subscribe: handleBidiStreamingCall<SubscribeRequest, SubscribeUpdate>;
  ping: handleUnaryCall<PingRequest, PongResponse>;
  getLatestBlockhash: handleUnaryCall<
    GetLatestBlockhashRequest,
    GetLatestBlockhashResponse
  >;
  getBlockHeight: handleUnaryCall<
    GetBlockHeightRequest,
    GetBlockHeightResponse
  >;
  getSlot: handleUnaryCall<GetSlotRequest, GetSlotResponse>;
  isBlockhashValid: handleUnaryCall<
    IsBlockhashValidRequest,
    IsBlockhashValidResponse
  >;
  getVersion: handleUnaryCall<GetVersionRequest, GetVersionResponse>;
}

export interface GeyserClient extends Client {
  subscribe(): ClientDuplexStream<SubscribeRequest, SubscribeUpdate>;
  subscribe(
    options: Partial<CallOptions>
  ): ClientDuplexStream<SubscribeRequest, SubscribeUpdate>;
  subscribe(
    metadata: Metadata,
    options?: Partial<CallOptions>
  ): ClientDuplexStream<SubscribeRequest, SubscribeUpdate>;
  ping(
    request: PingRequest,
    callback: (error: ServiceError | null, response: PongResponse) => void
  ): ClientUnaryCall;
  ping(
    request: PingRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: PongResponse) => void
  ): ClientUnaryCall;
  ping(
    request: PingRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: PongResponse) => void
  ): ClientUnaryCall;
  getLatestBlockhash(
    request: GetLatestBlockhashRequest,
    callback: (
      error: ServiceError | null,
      response: GetLatestBlockhashResponse
    ) => void
  ): ClientUnaryCall;
  getLatestBlockhash(
    request: GetLatestBlockhashRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetLatestBlockhashResponse
    ) => void
  ): ClientUnaryCall;
  getLatestBlockhash(
    request: GetLatestBlockhashRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetLatestBlockhashResponse
    ) => void
  ): ClientUnaryCall;
  getBlockHeight(
    request: GetBlockHeightRequest,
    callback: (
      error: ServiceError | null,
      response: GetBlockHeightResponse
    ) => void
  ): ClientUnaryCall;
  getBlockHeight(
    request: GetBlockHeightRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetBlockHeightResponse
    ) => void
  ): ClientUnaryCall;
  getBlockHeight(
    request: GetBlockHeightRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetBlockHeightResponse
    ) => void
  ): ClientUnaryCall;
  getSlot(
    request: GetSlotRequest,
    callback: (error: ServiceError | null, response: GetSlotResponse) => void
  ): ClientUnaryCall;
  getSlot(
    request: GetSlotRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetSlotResponse) => void
  ): ClientUnaryCall;
  getSlot(
    request: GetSlotRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetSlotResponse) => void
  ): ClientUnaryCall;
  isBlockhashValid(
    request: IsBlockhashValidRequest,
    callback: (
      error: ServiceError | null,
      response: IsBlockhashValidResponse
    ) => void
  ): ClientUnaryCall;
  isBlockhashValid(
    request: IsBlockhashValidRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: IsBlockhashValidResponse
    ) => void
  ): ClientUnaryCall;
  isBlockhashValid(
    request: IsBlockhashValidRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: IsBlockhashValidResponse
    ) => void
  ): ClientUnaryCall;
  getVersion(
    request: GetVersionRequest,
    callback: (error: ServiceError | null, response: GetVersionResponse) => void
  ): ClientUnaryCall;
  getVersion(
    request: GetVersionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetVersionResponse) => void
  ): ClientUnaryCall;
  getVersion(
    request: GetVersionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetVersionResponse) => void
  ): ClientUnaryCall;
}

export const GeyserClient = makeGenericClientConstructor(
  GeyserService,
  "geyser.Geyser"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ClientOptions>
  ): GeyserClient;
  service: typeof GeyserService;
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

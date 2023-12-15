/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "solana.storage.ConfirmedBlock";

export enum RewardType {
  Unspecified = 0,
  Fee = 1,
  Rent = 2,
  Staking = 3,
  Voting = 4,
  UNRECOGNIZED = -1,
}

export function rewardTypeFromJSON(object: any): RewardType {
  switch (object) {
    case 0:
    case "Unspecified":
      return RewardType.Unspecified;
    case 1:
    case "Fee":
      return RewardType.Fee;
    case 2:
    case "Rent":
      return RewardType.Rent;
    case 3:
    case "Staking":
      return RewardType.Staking;
    case 4:
    case "Voting":
      return RewardType.Voting;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RewardType.UNRECOGNIZED;
  }
}

export function rewardTypeToJSON(object: RewardType): string {
  switch (object) {
    case RewardType.Unspecified:
      return "Unspecified";
    case RewardType.Fee:
      return "Fee";
    case RewardType.Rent:
      return "Rent";
    case RewardType.Staking:
      return "Staking";
    case RewardType.Voting:
      return "Voting";
    case RewardType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ConfirmedBlock {
  previousBlockhash: string;
  blockhash: string;
  parentSlot: string;
  transactions: ConfirmedTransaction[];
  rewards: Reward[];
  blockTime: UnixTimestamp | undefined;
  blockHeight: BlockHeight | undefined;
}

export interface ConfirmedTransaction {
  transaction: Transaction | undefined;
  meta: TransactionStatusMeta | undefined;
}

export interface Transaction {
  signatures: Uint8Array[];
  message: Message | undefined;
}

export interface Message {
  header: MessageHeader | undefined;
  accountKeys: Uint8Array[];
  recentBlockhash: Uint8Array;
  instructions: CompiledInstruction[];
  versioned: boolean;
  addressTableLookups: MessageAddressTableLookup[];
}

export interface MessageHeader {
  numRequiredSignatures: number;
  numReadonlySignedAccounts: number;
  numReadonlyUnsignedAccounts: number;
}

export interface MessageAddressTableLookup {
  accountKey: Uint8Array;
  writableIndexes: Uint8Array;
  readonlyIndexes: Uint8Array;
}

export interface TransactionStatusMeta {
  err: TransactionError | undefined;
  fee: string;
  preBalances: string[];
  postBalances: string[];
  innerInstructions: InnerInstructions[];
  innerInstructionsNone: boolean;
  logMessages: string[];
  logMessagesNone: boolean;
  preTokenBalances: TokenBalance[];
  postTokenBalances: TokenBalance[];
  rewards: Reward[];
  loadedWritableAddresses: Uint8Array[];
  loadedReadonlyAddresses: Uint8Array[];
  returnData: ReturnData | undefined;
  returnDataNone: boolean;
  /**
   * Sum of compute units consumed by all instructions.
   * Available since Solana v1.10.35 / v1.11.6.
   * Set to `None` for txs executed on earlier versions.
   */
  computeUnitsConsumed?: string | undefined;
}

export interface TransactionError {
  err: Uint8Array;
}

export interface InnerInstructions {
  index: number;
  instructions: InnerInstruction[];
}

export interface InnerInstruction {
  programIdIndex: number;
  accounts: Uint8Array;
  data: Uint8Array;
  /**
   * Invocation stack height of an inner instruction.
   * Available since Solana v1.14.6
   * Set to `None` for txs executed on earlier versions.
   */
  stackHeight?: number | undefined;
}

export interface CompiledInstruction {
  programIdIndex: number;
  accounts: Uint8Array;
  data: Uint8Array;
}

export interface TokenBalance {
  accountIndex: number;
  mint: string;
  uiTokenAmount: UiTokenAmount | undefined;
  owner: string;
  programId: string;
}

export interface UiTokenAmount {
  uiAmount: number;
  decimals: number;
  amount: string;
  uiAmountString: string;
}

export interface ReturnData {
  programId: Uint8Array;
  data: Uint8Array;
}

export interface Reward {
  pubkey: string;
  lamports: string;
  postBalance: string;
  rewardType: RewardType;
  commission: string;
}

export interface Rewards {
  rewards: Reward[];
}

export interface UnixTimestamp {
  timestamp: string;
}

export interface BlockHeight {
  blockHeight: string;
}

function createBaseConfirmedBlock(): ConfirmedBlock {
  return {
    previousBlockhash: "",
    blockhash: "",
    parentSlot: "0",
    transactions: [],
    rewards: [],
    blockTime: undefined,
    blockHeight: undefined,
  };
}

export const ConfirmedBlock = {
  encode(
    message: ConfirmedBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.previousBlockhash !== "") {
      writer.uint32(10).string(message.previousBlockhash);
    }
    if (message.blockhash !== "") {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.parentSlot !== "0") {
      writer.uint32(24).uint64(message.parentSlot);
    }
    for (const v of message.transactions) {
      ConfirmedTransaction.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.rewards) {
      Reward.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.blockTime !== undefined) {
      UnixTimestamp.encode(
        message.blockTime,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.blockHeight !== undefined) {
      BlockHeight.encode(
        message.blockHeight,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfirmedBlock {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfirmedBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.previousBlockhash = reader.string();
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

          message.parentSlot = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.transactions.push(
            ConfirmedTransaction.decode(reader, reader.uint32())
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.rewards.push(Reward.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.blockTime = UnixTimestamp.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.blockHeight = BlockHeight.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfirmedBlock {
    return {
      previousBlockhash: isSet(object.previousBlockhash)
        ? globalThis.String(object.previousBlockhash)
        : "",
      blockhash: isSet(object.blockhash)
        ? globalThis.String(object.blockhash)
        : "",
      parentSlot: isSet(object.parentSlot)
        ? globalThis.String(object.parentSlot)
        : "0",
      transactions: globalThis.Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => ConfirmedTransaction.fromJSON(e))
        : [],
      rewards: globalThis.Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => Reward.fromJSON(e))
        : [],
      blockTime: isSet(object.blockTime)
        ? UnixTimestamp.fromJSON(object.blockTime)
        : undefined,
      blockHeight: isSet(object.blockHeight)
        ? BlockHeight.fromJSON(object.blockHeight)
        : undefined,
    };
  },

  toJSON(message: ConfirmedBlock): unknown {
    const obj: any = {};
    if (message.previousBlockhash !== "") {
      obj.previousBlockhash = message.previousBlockhash;
    }
    if (message.blockhash !== "") {
      obj.blockhash = message.blockhash;
    }
    if (message.parentSlot !== "0") {
      obj.parentSlot = message.parentSlot;
    }
    if (message.transactions?.length) {
      obj.transactions = message.transactions.map((e) =>
        ConfirmedTransaction.toJSON(e)
      );
    }
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => Reward.toJSON(e));
    }
    if (message.blockTime !== undefined) {
      obj.blockTime = UnixTimestamp.toJSON(message.blockTime);
    }
    if (message.blockHeight !== undefined) {
      obj.blockHeight = BlockHeight.toJSON(message.blockHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfirmedBlock>, I>>(
    base?: I
  ): ConfirmedBlock {
    return ConfirmedBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConfirmedBlock>, I>>(
    object: I
  ): ConfirmedBlock {
    const message = createBaseConfirmedBlock();
    message.previousBlockhash = object.previousBlockhash ?? "";
    message.blockhash = object.blockhash ?? "";
    message.parentSlot = object.parentSlot ?? "0";
    message.transactions =
      object.transactions?.map((e) => ConfirmedTransaction.fromPartial(e)) ||
      [];
    message.rewards = object.rewards?.map((e) => Reward.fromPartial(e)) || [];
    message.blockTime =
      object.blockTime !== undefined && object.blockTime !== null
        ? UnixTimestamp.fromPartial(object.blockTime)
        : undefined;
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? BlockHeight.fromPartial(object.blockHeight)
        : undefined;
    return message;
  },
};

function createBaseConfirmedTransaction(): ConfirmedTransaction {
  return { transaction: undefined, meta: undefined };
}

export const ConfirmedTransaction = {
  encode(
    message: ConfirmedTransaction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(
        message.transaction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.meta !== undefined) {
      TransactionStatusMeta.encode(
        message.meta,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConfirmedTransaction {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfirmedTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.transaction = Transaction.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.meta = TransactionStatusMeta.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfirmedTransaction {
    return {
      transaction: isSet(object.transaction)
        ? Transaction.fromJSON(object.transaction)
        : undefined,
      meta: isSet(object.meta)
        ? TransactionStatusMeta.fromJSON(object.meta)
        : undefined,
    };
  },

  toJSON(message: ConfirmedTransaction): unknown {
    const obj: any = {};
    if (message.transaction !== undefined) {
      obj.transaction = Transaction.toJSON(message.transaction);
    }
    if (message.meta !== undefined) {
      obj.meta = TransactionStatusMeta.toJSON(message.meta);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConfirmedTransaction>, I>>(
    base?: I
  ): ConfirmedTransaction {
    return ConfirmedTransaction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConfirmedTransaction>, I>>(
    object: I
  ): ConfirmedTransaction {
    const message = createBaseConfirmedTransaction();
    message.transaction =
      object.transaction !== undefined && object.transaction !== null
        ? Transaction.fromPartial(object.transaction)
        : undefined;
    message.meta =
      object.meta !== undefined && object.meta !== null
        ? TransactionStatusMeta.fromPartial(object.meta)
        : undefined;
    return message;
  },
};

function createBaseTransaction(): Transaction {
  return { signatures: [], message: undefined };
}

export const Transaction = {
  encode(
    message: Transaction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.signatures) {
      writer.uint32(10).bytes(v!);
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Transaction {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signatures.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = Message.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Transaction {
    return {
      signatures: globalThis.Array.isArray(object?.signatures)
        ? object.signatures.map((e: any) => bytesFromBase64(e))
        : [],
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: Transaction): unknown {
    const obj: any = {};
    if (message.signatures?.length) {
      obj.signatures = message.signatures.map((e) => base64FromBytes(e));
    }
    if (message.message !== undefined) {
      obj.message = Message.toJSON(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Transaction>, I>>(base?: I): Transaction {
    return Transaction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Transaction>, I>>(
    object: I
  ): Transaction {
    const message = createBaseTransaction();
    message.signatures = object.signatures?.map((e) => e) || [];
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    header: undefined,
    accountKeys: [],
    recentBlockhash: new Uint8Array(0),
    instructions: [],
    versioned: false,
    addressTableLookups: [],
  };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.header !== undefined) {
      MessageHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.accountKeys) {
      writer.uint32(18).bytes(v!);
    }
    if (message.recentBlockhash.length !== 0) {
      writer.uint32(26).bytes(message.recentBlockhash);
    }
    for (const v of message.instructions) {
      CompiledInstruction.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.versioned === true) {
      writer.uint32(40).bool(message.versioned);
    }
    for (const v of message.addressTableLookups) {
      MessageAddressTableLookup.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.header = MessageHeader.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accountKeys.push(reader.bytes());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.recentBlockhash = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instructions.push(
            CompiledInstruction.decode(reader, reader.uint32())
          );
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.versioned = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.addressTableLookups.push(
            MessageAddressTableLookup.decode(reader, reader.uint32())
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

  fromJSON(object: any): Message {
    return {
      header: isSet(object.header)
        ? MessageHeader.fromJSON(object.header)
        : undefined,
      accountKeys: globalThis.Array.isArray(object?.accountKeys)
        ? object.accountKeys.map((e: any) => bytesFromBase64(e))
        : [],
      recentBlockhash: isSet(object.recentBlockhash)
        ? bytesFromBase64(object.recentBlockhash)
        : new Uint8Array(0),
      instructions: globalThis.Array.isArray(object?.instructions)
        ? object.instructions.map((e: any) => CompiledInstruction.fromJSON(e))
        : [],
      versioned: isSet(object.versioned)
        ? globalThis.Boolean(object.versioned)
        : false,
      addressTableLookups: globalThis.Array.isArray(object?.addressTableLookups)
        ? object.addressTableLookups.map((e: any) =>
            MessageAddressTableLookup.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.header !== undefined) {
      obj.header = MessageHeader.toJSON(message.header);
    }
    if (message.accountKeys?.length) {
      obj.accountKeys = message.accountKeys.map((e) => base64FromBytes(e));
    }
    if (message.recentBlockhash.length !== 0) {
      obj.recentBlockhash = base64FromBytes(message.recentBlockhash);
    }
    if (message.instructions?.length) {
      obj.instructions = message.instructions.map((e) =>
        CompiledInstruction.toJSON(e)
      );
    }
    if (message.versioned === true) {
      obj.versioned = message.versioned;
    }
    if (message.addressTableLookups?.length) {
      obj.addressTableLookups = message.addressTableLookups.map((e) =>
        MessageAddressTableLookup.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.header =
      object.header !== undefined && object.header !== null
        ? MessageHeader.fromPartial(object.header)
        : undefined;
    message.accountKeys = object.accountKeys?.map((e) => e) || [];
    message.recentBlockhash = object.recentBlockhash ?? new Uint8Array(0);
    message.instructions =
      object.instructions?.map((e) => CompiledInstruction.fromPartial(e)) || [];
    message.versioned = object.versioned ?? false;
    message.addressTableLookups =
      object.addressTableLookups?.map((e) =>
        MessageAddressTableLookup.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseMessageHeader(): MessageHeader {
  return {
    numRequiredSignatures: 0,
    numReadonlySignedAccounts: 0,
    numReadonlyUnsignedAccounts: 0,
  };
}

export const MessageHeader = {
  encode(
    message: MessageHeader,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.numRequiredSignatures !== 0) {
      writer.uint32(8).uint32(message.numRequiredSignatures);
    }
    if (message.numReadonlySignedAccounts !== 0) {
      writer.uint32(16).uint32(message.numReadonlySignedAccounts);
    }
    if (message.numReadonlyUnsignedAccounts !== 0) {
      writer.uint32(24).uint32(message.numReadonlyUnsignedAccounts);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageHeader {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numRequiredSignatures = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numReadonlySignedAccounts = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numReadonlyUnsignedAccounts = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageHeader {
    return {
      numRequiredSignatures: isSet(object.numRequiredSignatures)
        ? globalThis.Number(object.numRequiredSignatures)
        : 0,
      numReadonlySignedAccounts: isSet(object.numReadonlySignedAccounts)
        ? globalThis.Number(object.numReadonlySignedAccounts)
        : 0,
      numReadonlyUnsignedAccounts: isSet(object.numReadonlyUnsignedAccounts)
        ? globalThis.Number(object.numReadonlyUnsignedAccounts)
        : 0,
    };
  },

  toJSON(message: MessageHeader): unknown {
    const obj: any = {};
    if (message.numRequiredSignatures !== 0) {
      obj.numRequiredSignatures = Math.round(message.numRequiredSignatures);
    }
    if (message.numReadonlySignedAccounts !== 0) {
      obj.numReadonlySignedAccounts = Math.round(
        message.numReadonlySignedAccounts
      );
    }
    if (message.numReadonlyUnsignedAccounts !== 0) {
      obj.numReadonlyUnsignedAccounts = Math.round(
        message.numReadonlyUnsignedAccounts
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageHeader>, I>>(
    base?: I
  ): MessageHeader {
    return MessageHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageHeader>, I>>(
    object: I
  ): MessageHeader {
    const message = createBaseMessageHeader();
    message.numRequiredSignatures = object.numRequiredSignatures ?? 0;
    message.numReadonlySignedAccounts = object.numReadonlySignedAccounts ?? 0;
    message.numReadonlyUnsignedAccounts =
      object.numReadonlyUnsignedAccounts ?? 0;
    return message;
  },
};

function createBaseMessageAddressTableLookup(): MessageAddressTableLookup {
  return {
    accountKey: new Uint8Array(0),
    writableIndexes: new Uint8Array(0),
    readonlyIndexes: new Uint8Array(0),
  };
}

export const MessageAddressTableLookup = {
  encode(
    message: MessageAddressTableLookup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountKey.length !== 0) {
      writer.uint32(10).bytes(message.accountKey);
    }
    if (message.writableIndexes.length !== 0) {
      writer.uint32(18).bytes(message.writableIndexes);
    }
    if (message.readonlyIndexes.length !== 0) {
      writer.uint32(26).bytes(message.readonlyIndexes);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MessageAddressTableLookup {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageAddressTableLookup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountKey = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.writableIndexes = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.readonlyIndexes = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageAddressTableLookup {
    return {
      accountKey: isSet(object.accountKey)
        ? bytesFromBase64(object.accountKey)
        : new Uint8Array(0),
      writableIndexes: isSet(object.writableIndexes)
        ? bytesFromBase64(object.writableIndexes)
        : new Uint8Array(0),
      readonlyIndexes: isSet(object.readonlyIndexes)
        ? bytesFromBase64(object.readonlyIndexes)
        : new Uint8Array(0),
    };
  },

  toJSON(message: MessageAddressTableLookup): unknown {
    const obj: any = {};
    if (message.accountKey.length !== 0) {
      obj.accountKey = base64FromBytes(message.accountKey);
    }
    if (message.writableIndexes.length !== 0) {
      obj.writableIndexes = base64FromBytes(message.writableIndexes);
    }
    if (message.readonlyIndexes.length !== 0) {
      obj.readonlyIndexes = base64FromBytes(message.readonlyIndexes);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageAddressTableLookup>, I>>(
    base?: I
  ): MessageAddressTableLookup {
    return MessageAddressTableLookup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageAddressTableLookup>, I>>(
    object: I
  ): MessageAddressTableLookup {
    const message = createBaseMessageAddressTableLookup();
    message.accountKey = object.accountKey ?? new Uint8Array(0);
    message.writableIndexes = object.writableIndexes ?? new Uint8Array(0);
    message.readonlyIndexes = object.readonlyIndexes ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTransactionStatusMeta(): TransactionStatusMeta {
  return {
    err: undefined,
    fee: "0",
    preBalances: [],
    postBalances: [],
    innerInstructions: [],
    innerInstructionsNone: false,
    logMessages: [],
    logMessagesNone: false,
    preTokenBalances: [],
    postTokenBalances: [],
    rewards: [],
    loadedWritableAddresses: [],
    loadedReadonlyAddresses: [],
    returnData: undefined,
    returnDataNone: false,
    computeUnitsConsumed: undefined,
  };
}

export const TransactionStatusMeta = {
  encode(
    message: TransactionStatusMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.err !== undefined) {
      TransactionError.encode(message.err, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== "0") {
      writer.uint32(16).uint64(message.fee);
    }
    writer.uint32(26).fork();
    for (const v of message.preBalances) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.postBalances) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.innerInstructions) {
      InnerInstructions.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.innerInstructionsNone === true) {
      writer.uint32(80).bool(message.innerInstructionsNone);
    }
    for (const v of message.logMessages) {
      writer.uint32(50).string(v!);
    }
    if (message.logMessagesNone === true) {
      writer.uint32(88).bool(message.logMessagesNone);
    }
    for (const v of message.preTokenBalances) {
      TokenBalance.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.postTokenBalances) {
      TokenBalance.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.rewards) {
      Reward.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.loadedWritableAddresses) {
      writer.uint32(98).bytes(v!);
    }
    for (const v of message.loadedReadonlyAddresses) {
      writer.uint32(106).bytes(v!);
    }
    if (message.returnData !== undefined) {
      ReturnData.encode(message.returnData, writer.uint32(114).fork()).ldelim();
    }
    if (message.returnDataNone === true) {
      writer.uint32(120).bool(message.returnDataNone);
    }
    if (message.computeUnitsConsumed !== undefined) {
      writer.uint32(128).uint64(message.computeUnitsConsumed);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TransactionStatusMeta {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionStatusMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.err = TransactionError.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.fee = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag === 24) {
            message.preBalances.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.preBalances.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 4:
          if (tag === 32) {
            message.postBalances.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.postBalances.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.innerInstructions.push(
            InnerInstructions.decode(reader, reader.uint32())
          );
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.innerInstructionsNone = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.logMessages.push(reader.string());
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.logMessagesNone = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.preTokenBalances.push(
            TokenBalance.decode(reader, reader.uint32())
          );
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.postTokenBalances.push(
            TokenBalance.decode(reader, reader.uint32())
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.rewards.push(Reward.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.loadedWritableAddresses.push(reader.bytes());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.loadedReadonlyAddresses.push(reader.bytes());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.returnData = ReturnData.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.returnDataNone = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.computeUnitsConsumed = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransactionStatusMeta {
    return {
      err: isSet(object.err)
        ? TransactionError.fromJSON(object.err)
        : undefined,
      fee: isSet(object.fee) ? globalThis.String(object.fee) : "0",
      preBalances: globalThis.Array.isArray(object?.preBalances)
        ? object.preBalances.map((e: any) => globalThis.String(e))
        : [],
      postBalances: globalThis.Array.isArray(object?.postBalances)
        ? object.postBalances.map((e: any) => globalThis.String(e))
        : [],
      innerInstructions: globalThis.Array.isArray(object?.innerInstructions)
        ? object.innerInstructions.map((e: any) =>
            InnerInstructions.fromJSON(e)
          )
        : [],
      innerInstructionsNone: isSet(object.innerInstructionsNone)
        ? globalThis.Boolean(object.innerInstructionsNone)
        : false,
      logMessages: globalThis.Array.isArray(object?.logMessages)
        ? object.logMessages.map((e: any) => globalThis.String(e))
        : [],
      logMessagesNone: isSet(object.logMessagesNone)
        ? globalThis.Boolean(object.logMessagesNone)
        : false,
      preTokenBalances: globalThis.Array.isArray(object?.preTokenBalances)
        ? object.preTokenBalances.map((e: any) => TokenBalance.fromJSON(e))
        : [],
      postTokenBalances: globalThis.Array.isArray(object?.postTokenBalances)
        ? object.postTokenBalances.map((e: any) => TokenBalance.fromJSON(e))
        : [],
      rewards: globalThis.Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => Reward.fromJSON(e))
        : [],
      loadedWritableAddresses: globalThis.Array.isArray(
        object?.loadedWritableAddresses
      )
        ? object.loadedWritableAddresses.map((e: any) => bytesFromBase64(e))
        : [],
      loadedReadonlyAddresses: globalThis.Array.isArray(
        object?.loadedReadonlyAddresses
      )
        ? object.loadedReadonlyAddresses.map((e: any) => bytesFromBase64(e))
        : [],
      returnData: isSet(object.returnData)
        ? ReturnData.fromJSON(object.returnData)
        : undefined,
      returnDataNone: isSet(object.returnDataNone)
        ? globalThis.Boolean(object.returnDataNone)
        : false,
      computeUnitsConsumed: isSet(object.computeUnitsConsumed)
        ? globalThis.String(object.computeUnitsConsumed)
        : undefined,
    };
  },

  toJSON(message: TransactionStatusMeta): unknown {
    const obj: any = {};
    if (message.err !== undefined) {
      obj.err = TransactionError.toJSON(message.err);
    }
    if (message.fee !== "0") {
      obj.fee = message.fee;
    }
    if (message.preBalances?.length) {
      obj.preBalances = message.preBalances;
    }
    if (message.postBalances?.length) {
      obj.postBalances = message.postBalances;
    }
    if (message.innerInstructions?.length) {
      obj.innerInstructions = message.innerInstructions.map((e) =>
        InnerInstructions.toJSON(e)
      );
    }
    if (message.innerInstructionsNone === true) {
      obj.innerInstructionsNone = message.innerInstructionsNone;
    }
    if (message.logMessages?.length) {
      obj.logMessages = message.logMessages;
    }
    if (message.logMessagesNone === true) {
      obj.logMessagesNone = message.logMessagesNone;
    }
    if (message.preTokenBalances?.length) {
      obj.preTokenBalances = message.preTokenBalances.map((e) =>
        TokenBalance.toJSON(e)
      );
    }
    if (message.postTokenBalances?.length) {
      obj.postTokenBalances = message.postTokenBalances.map((e) =>
        TokenBalance.toJSON(e)
      );
    }
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => Reward.toJSON(e));
    }
    if (message.loadedWritableAddresses?.length) {
      obj.loadedWritableAddresses = message.loadedWritableAddresses.map((e) =>
        base64FromBytes(e)
      );
    }
    if (message.loadedReadonlyAddresses?.length) {
      obj.loadedReadonlyAddresses = message.loadedReadonlyAddresses.map((e) =>
        base64FromBytes(e)
      );
    }
    if (message.returnData !== undefined) {
      obj.returnData = ReturnData.toJSON(message.returnData);
    }
    if (message.returnDataNone === true) {
      obj.returnDataNone = message.returnDataNone;
    }
    if (message.computeUnitsConsumed !== undefined) {
      obj.computeUnitsConsumed = message.computeUnitsConsumed;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionStatusMeta>, I>>(
    base?: I
  ): TransactionStatusMeta {
    return TransactionStatusMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TransactionStatusMeta>, I>>(
    object: I
  ): TransactionStatusMeta {
    const message = createBaseTransactionStatusMeta();
    message.err =
      object.err !== undefined && object.err !== null
        ? TransactionError.fromPartial(object.err)
        : undefined;
    message.fee = object.fee ?? "0";
    message.preBalances = object.preBalances?.map((e) => e) || [];
    message.postBalances = object.postBalances?.map((e) => e) || [];
    message.innerInstructions =
      object.innerInstructions?.map((e) => InnerInstructions.fromPartial(e)) ||
      [];
    message.innerInstructionsNone = object.innerInstructionsNone ?? false;
    message.logMessages = object.logMessages?.map((e) => e) || [];
    message.logMessagesNone = object.logMessagesNone ?? false;
    message.preTokenBalances =
      object.preTokenBalances?.map((e) => TokenBalance.fromPartial(e)) || [];
    message.postTokenBalances =
      object.postTokenBalances?.map((e) => TokenBalance.fromPartial(e)) || [];
    message.rewards = object.rewards?.map((e) => Reward.fromPartial(e)) || [];
    message.loadedWritableAddresses =
      object.loadedWritableAddresses?.map((e) => e) || [];
    message.loadedReadonlyAddresses =
      object.loadedReadonlyAddresses?.map((e) => e) || [];
    message.returnData =
      object.returnData !== undefined && object.returnData !== null
        ? ReturnData.fromPartial(object.returnData)
        : undefined;
    message.returnDataNone = object.returnDataNone ?? false;
    message.computeUnitsConsumed = object.computeUnitsConsumed ?? undefined;
    return message;
  },
};

function createBaseTransactionError(): TransactionError {
  return { err: new Uint8Array(0) };
}

export const TransactionError = {
  encode(
    message: TransactionError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.err.length !== 0) {
      writer.uint32(10).bytes(message.err);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionError {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.err = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransactionError {
    return {
      err: isSet(object.err) ? bytesFromBase64(object.err) : new Uint8Array(0),
    };
  },

  toJSON(message: TransactionError): unknown {
    const obj: any = {};
    if (message.err.length !== 0) {
      obj.err = base64FromBytes(message.err);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionError>, I>>(
    base?: I
  ): TransactionError {
    return TransactionError.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TransactionError>, I>>(
    object: I
  ): TransactionError {
    const message = createBaseTransactionError();
    message.err = object.err ?? new Uint8Array(0);
    return message;
  },
};

function createBaseInnerInstructions(): InnerInstructions {
  return { index: 0, instructions: [] };
}

export const InnerInstructions = {
  encode(
    message: InnerInstructions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    for (const v of message.instructions) {
      InnerInstruction.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InnerInstructions {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInnerInstructions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.instructions.push(
            InnerInstruction.decode(reader, reader.uint32())
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

  fromJSON(object: any): InnerInstructions {
    return {
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      instructions: globalThis.Array.isArray(object?.instructions)
        ? object.instructions.map((e: any) => InnerInstruction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: InnerInstructions): unknown {
    const obj: any = {};
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.instructions?.length) {
      obj.instructions = message.instructions.map((e) =>
        InnerInstruction.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InnerInstructions>, I>>(
    base?: I
  ): InnerInstructions {
    return InnerInstructions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InnerInstructions>, I>>(
    object: I
  ): InnerInstructions {
    const message = createBaseInnerInstructions();
    message.index = object.index ?? 0;
    message.instructions =
      object.instructions?.map((e) => InnerInstruction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInnerInstruction(): InnerInstruction {
  return {
    programIdIndex: 0,
    accounts: new Uint8Array(0),
    data: new Uint8Array(0),
    stackHeight: undefined,
  };
}

export const InnerInstruction = {
  encode(
    message: InnerInstruction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.programIdIndex !== 0) {
      writer.uint32(8).uint32(message.programIdIndex);
    }
    if (message.accounts.length !== 0) {
      writer.uint32(18).bytes(message.accounts);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (message.stackHeight !== undefined) {
      writer.uint32(32).uint32(message.stackHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InnerInstruction {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInnerInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.programIdIndex = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accounts = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.stackHeight = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InnerInstruction {
    return {
      programIdIndex: isSet(object.programIdIndex)
        ? globalThis.Number(object.programIdIndex)
        : 0,
      accounts: isSet(object.accounts)
        ? bytesFromBase64(object.accounts)
        : new Uint8Array(0),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(0),
      stackHeight: isSet(object.stackHeight)
        ? globalThis.Number(object.stackHeight)
        : undefined,
    };
  },

  toJSON(message: InnerInstruction): unknown {
    const obj: any = {};
    if (message.programIdIndex !== 0) {
      obj.programIdIndex = Math.round(message.programIdIndex);
    }
    if (message.accounts.length !== 0) {
      obj.accounts = base64FromBytes(message.accounts);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.stackHeight !== undefined) {
      obj.stackHeight = Math.round(message.stackHeight);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InnerInstruction>, I>>(
    base?: I
  ): InnerInstruction {
    return InnerInstruction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InnerInstruction>, I>>(
    object: I
  ): InnerInstruction {
    const message = createBaseInnerInstruction();
    message.programIdIndex = object.programIdIndex ?? 0;
    message.accounts = object.accounts ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    message.stackHeight = object.stackHeight ?? undefined;
    return message;
  },
};

function createBaseCompiledInstruction(): CompiledInstruction {
  return {
    programIdIndex: 0,
    accounts: new Uint8Array(0),
    data: new Uint8Array(0),
  };
}

export const CompiledInstruction = {
  encode(
    message: CompiledInstruction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.programIdIndex !== 0) {
      writer.uint32(8).uint32(message.programIdIndex);
    }
    if (message.accounts.length !== 0) {
      writer.uint32(18).bytes(message.accounts);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompiledInstruction {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompiledInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.programIdIndex = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accounts = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CompiledInstruction {
    return {
      programIdIndex: isSet(object.programIdIndex)
        ? globalThis.Number(object.programIdIndex)
        : 0,
      accounts: isSet(object.accounts)
        ? bytesFromBase64(object.accounts)
        : new Uint8Array(0),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(0),
    };
  },

  toJSON(message: CompiledInstruction): unknown {
    const obj: any = {};
    if (message.programIdIndex !== 0) {
      obj.programIdIndex = Math.round(message.programIdIndex);
    }
    if (message.accounts.length !== 0) {
      obj.accounts = base64FromBytes(message.accounts);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompiledInstruction>, I>>(
    base?: I
  ): CompiledInstruction {
    return CompiledInstruction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompiledInstruction>, I>>(
    object: I
  ): CompiledInstruction {
    const message = createBaseCompiledInstruction();
    message.programIdIndex = object.programIdIndex ?? 0;
    message.accounts = object.accounts ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTokenBalance(): TokenBalance {
  return {
    accountIndex: 0,
    mint: "",
    uiTokenAmount: undefined,
    owner: "",
    programId: "",
  };
}

export const TokenBalance = {
  encode(
    message: TokenBalance,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accountIndex !== 0) {
      writer.uint32(8).uint32(message.accountIndex);
    }
    if (message.mint !== "") {
      writer.uint32(18).string(message.mint);
    }
    if (message.uiTokenAmount !== undefined) {
      UiTokenAmount.encode(
        message.uiTokenAmount,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(34).string(message.owner);
    }
    if (message.programId !== "") {
      writer.uint32(42).string(message.programId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenBalance {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.accountIndex = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mint = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.uiTokenAmount = UiTokenAmount.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.programId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TokenBalance {
    return {
      accountIndex: isSet(object.accountIndex)
        ? globalThis.Number(object.accountIndex)
        : 0,
      mint: isSet(object.mint) ? globalThis.String(object.mint) : "",
      uiTokenAmount: isSet(object.uiTokenAmount)
        ? UiTokenAmount.fromJSON(object.uiTokenAmount)
        : undefined,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      programId: isSet(object.programId)
        ? globalThis.String(object.programId)
        : "",
    };
  },

  toJSON(message: TokenBalance): unknown {
    const obj: any = {};
    if (message.accountIndex !== 0) {
      obj.accountIndex = Math.round(message.accountIndex);
    }
    if (message.mint !== "") {
      obj.mint = message.mint;
    }
    if (message.uiTokenAmount !== undefined) {
      obj.uiTokenAmount = UiTokenAmount.toJSON(message.uiTokenAmount);
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.programId !== "") {
      obj.programId = message.programId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenBalance>, I>>(
    base?: I
  ): TokenBalance {
    return TokenBalance.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TokenBalance>, I>>(
    object: I
  ): TokenBalance {
    const message = createBaseTokenBalance();
    message.accountIndex = object.accountIndex ?? 0;
    message.mint = object.mint ?? "";
    message.uiTokenAmount =
      object.uiTokenAmount !== undefined && object.uiTokenAmount !== null
        ? UiTokenAmount.fromPartial(object.uiTokenAmount)
        : undefined;
    message.owner = object.owner ?? "";
    message.programId = object.programId ?? "";
    return message;
  },
};

function createBaseUiTokenAmount(): UiTokenAmount {
  return { uiAmount: 0, decimals: 0, amount: "", uiAmountString: "" };
}

export const UiTokenAmount = {
  encode(
    message: UiTokenAmount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uiAmount !== 0) {
      writer.uint32(9).double(message.uiAmount);
    }
    if (message.decimals !== 0) {
      writer.uint32(16).uint32(message.decimals);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.uiAmountString !== "") {
      writer.uint32(34).string(message.uiAmountString);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UiTokenAmount {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUiTokenAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.uiAmount = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.decimals = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.uiAmountString = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UiTokenAmount {
    return {
      uiAmount: isSet(object.uiAmount) ? globalThis.Number(object.uiAmount) : 0,
      decimals: isSet(object.decimals) ? globalThis.Number(object.decimals) : 0,
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
      uiAmountString: isSet(object.uiAmountString)
        ? globalThis.String(object.uiAmountString)
        : "",
    };
  },

  toJSON(message: UiTokenAmount): unknown {
    const obj: any = {};
    if (message.uiAmount !== 0) {
      obj.uiAmount = message.uiAmount;
    }
    if (message.decimals !== 0) {
      obj.decimals = Math.round(message.decimals);
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    if (message.uiAmountString !== "") {
      obj.uiAmountString = message.uiAmountString;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UiTokenAmount>, I>>(
    base?: I
  ): UiTokenAmount {
    return UiTokenAmount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UiTokenAmount>, I>>(
    object: I
  ): UiTokenAmount {
    const message = createBaseUiTokenAmount();
    message.uiAmount = object.uiAmount ?? 0;
    message.decimals = object.decimals ?? 0;
    message.amount = object.amount ?? "";
    message.uiAmountString = object.uiAmountString ?? "";
    return message;
  },
};

function createBaseReturnData(): ReturnData {
  return { programId: new Uint8Array(0), data: new Uint8Array(0) };
}

export const ReturnData = {
  encode(
    message: ReturnData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.programId.length !== 0) {
      writer.uint32(10).bytes(message.programId);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReturnData {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReturnData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.programId = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReturnData {
    return {
      programId: isSet(object.programId)
        ? bytesFromBase64(object.programId)
        : new Uint8Array(0),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(0),
    };
  },

  toJSON(message: ReturnData): unknown {
    const obj: any = {};
    if (message.programId.length !== 0) {
      obj.programId = base64FromBytes(message.programId);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReturnData>, I>>(base?: I): ReturnData {
    return ReturnData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReturnData>, I>>(
    object: I
  ): ReturnData {
    const message = createBaseReturnData();
    message.programId = object.programId ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseReward(): Reward {
  return {
    pubkey: "",
    lamports: "0",
    postBalance: "0",
    rewardType: 0,
    commission: "",
  };
}

export const Reward = {
  encode(
    message: Reward,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pubkey !== "") {
      writer.uint32(10).string(message.pubkey);
    }
    if (message.lamports !== "0") {
      writer.uint32(16).int64(message.lamports);
    }
    if (message.postBalance !== "0") {
      writer.uint32(24).uint64(message.postBalance);
    }
    if (message.rewardType !== 0) {
      writer.uint32(32).int32(message.rewardType);
    }
    if (message.commission !== "") {
      writer.uint32(42).string(message.commission);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reward {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pubkey = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lamports = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.postBalance = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.rewardType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.commission = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Reward {
    return {
      pubkey: isSet(object.pubkey) ? globalThis.String(object.pubkey) : "",
      lamports: isSet(object.lamports)
        ? globalThis.String(object.lamports)
        : "0",
      postBalance: isSet(object.postBalance)
        ? globalThis.String(object.postBalance)
        : "0",
      rewardType: isSet(object.rewardType)
        ? rewardTypeFromJSON(object.rewardType)
        : 0,
      commission: isSet(object.commission)
        ? globalThis.String(object.commission)
        : "",
    };
  },

  toJSON(message: Reward): unknown {
    const obj: any = {};
    if (message.pubkey !== "") {
      obj.pubkey = message.pubkey;
    }
    if (message.lamports !== "0") {
      obj.lamports = message.lamports;
    }
    if (message.postBalance !== "0") {
      obj.postBalance = message.postBalance;
    }
    if (message.rewardType !== 0) {
      obj.rewardType = rewardTypeToJSON(message.rewardType);
    }
    if (message.commission !== "") {
      obj.commission = message.commission;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Reward>, I>>(base?: I): Reward {
    return Reward.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Reward>, I>>(object: I): Reward {
    const message = createBaseReward();
    message.pubkey = object.pubkey ?? "";
    message.lamports = object.lamports ?? "0";
    message.postBalance = object.postBalance ?? "0";
    message.rewardType = object.rewardType ?? 0;
    message.commission = object.commission ?? "";
    return message;
  },
};

function createBaseRewards(): Rewards {
  return { rewards: [] };
}

export const Rewards = {
  encode(
    message: Rewards,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.rewards) {
      Reward.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rewards {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rewards.push(Reward.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rewards {
    return {
      rewards: globalThis.Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => Reward.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Rewards): unknown {
    const obj: any = {};
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => Reward.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Rewards>, I>>(base?: I): Rewards {
    return Rewards.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Rewards>, I>>(object: I): Rewards {
    const message = createBaseRewards();
    message.rewards = object.rewards?.map((e) => Reward.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUnixTimestamp(): UnixTimestamp {
  return { timestamp: "0" };
}

export const UnixTimestamp = {
  encode(
    message: UnixTimestamp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.timestamp !== "0") {
      writer.uint32(8).int64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnixTimestamp {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnixTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.timestamp = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnixTimestamp {
    return {
      timestamp: isSet(object.timestamp)
        ? globalThis.String(object.timestamp)
        : "0",
    };
  },

  toJSON(message: UnixTimestamp): unknown {
    const obj: any = {};
    if (message.timestamp !== "0") {
      obj.timestamp = message.timestamp;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnixTimestamp>, I>>(
    base?: I
  ): UnixTimestamp {
    return UnixTimestamp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnixTimestamp>, I>>(
    object: I
  ): UnixTimestamp {
    const message = createBaseUnixTimestamp();
    message.timestamp = object.timestamp ?? "0";
    return message;
  },
};

function createBaseBlockHeight(): BlockHeight {
  return { blockHeight: "0" };
}

export const BlockHeight = {
  encode(
    message: BlockHeight,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.blockHeight !== "0") {
      writer.uint32(8).uint64(message.blockHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockHeight {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockHeight();
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

  fromJSON(object: any): BlockHeight {
    return {
      blockHeight: isSet(object.blockHeight)
        ? globalThis.String(object.blockHeight)
        : "0",
    };
  },

  toJSON(message: BlockHeight): unknown {
    const obj: any = {};
    if (message.blockHeight !== "0") {
      obj.blockHeight = message.blockHeight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockHeight>, I>>(base?: I): BlockHeight {
    return BlockHeight.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockHeight>, I>>(
    object: I
  ): BlockHeight {
    const message = createBaseBlockHeight();
    message.blockHeight = object.blockHeight ?? "0";
    return message;
  },
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

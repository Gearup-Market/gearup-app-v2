import { model, Schema } from "mongoose";
import { Escrow, EscrowProvider, EscrowStatus } from "../types";

const escrowSchema: Schema = new Schema<Escrow>({
    transaction: { type: Schema.Types.String, ref: 'Transaction', required: true },
    buyer: { type: Schema.Types.String, ref: 'User', required: true },
    seller: { type: Schema.Types.String, ref: 'User', required: true },
    amount: { type: Schema.Types.Number, required: true },
    status: { type: Schema.Types.String, enum: Object.values(EscrowStatus), default: EscrowStatus.PENDING },
    escrowProvider: { type: Schema.Types.String, enum: Object.values(EscrowProvider), default: EscrowProvider.GearUpLocal },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date },
});

const escrowModel = model<Escrow>("Escrow", escrowSchema, "escrow");

export default escrowModel;
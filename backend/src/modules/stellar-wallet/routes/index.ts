import { Router } from 'express';
import { Routes } from '@/types';
import StellarWalletController from '../controller';
import { validationMiddleware } from '@/lib';
import { createStellarWalletSchema, getStellarWalletSchema, transferXLMSchema } from '../validations';
import adminMiddleware from '@/lib/middlewares/admin.middleware';

class AuthRoute implements Routes {
  public path = '/stellar/wallets';
  public router: Router = Router();
  public stellarWalletController = new StellarWalletController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.stellarWalletController.findWallets.bind(this.stellarWalletController));
    this.router.get(`${this.path}/:userId`, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.findWallet.bind(this.stellarWalletController));
    this.router.get(`${this.path}/set-master/:userId`, adminMiddleware, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.setWalletAsMaster.bind(this.stellarWalletController));
    this.router.get(`${this.path}/transactions/:userId`, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.fetchWalletTransactions.bind(this.stellarWalletController));
    this.router.post(`${this.path}/create`, adminMiddleware, validationMiddleware(createStellarWalletSchema), this.stellarWalletController.createWallet.bind(this.stellarWalletController));
    this.router.post(`${this.path}/transfer`, validationMiddleware(transferXLMSchema), this.stellarWalletController.transferXLM.bind(this.stellarWalletController));
    // this.router.post(`${this.path}/:userId`, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.updateWallet.bind(this.stellarWalletController));
    // this.router.delete(`${this.path}/:userId`, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.deleteWallet.bind(this.stellarWalletController));
    // this.router.get(`${this.path}/create/:userId`, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.createTestWallet.bind(this.stellarWalletController));
  }
}

export default AuthRoute;
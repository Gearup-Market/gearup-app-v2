import { NextFunction, Request, Response } from 'express';
import sessionModel from '../models/session';
import userModel from '../models/users';
import { HttpException } from '@/core/exceptions/HttpException';

export default async function useSession(req: Request, res: Response, next: NextFunction) {
  const userId = req.body?.userId;
  const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  if (!userId) {
    return res.status(400).send('UserId is required');
  }

  const user = await userModel.findOne({ userId });
  if(!user) throw new HttpException(400, "User has not been registered. Have you called api/v1/user/identify?");

  let session = await sessionModel.findOne({ userId }).sort({ createdAt: -1 });
  let newSession: boolean = false;

  if (session && (Date.now() - session.lastActivity.getTime()) < sessionDuration) {
    session.lastActivity = new Date();
    await session.save();
  } else {
    // If session is expired or doesn't exist, create a new session with incremented count
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const newSessionCount = session ? session.sessionCount + 1 : 1;
    session = await sessionModel.create({
      userId,
      sessionId: currentTimestamp.toString(),
      sessionCount: newSessionCount,
      lastActivity: new Date(),
    });

    newSession = true;
  }

  const engagementTime = session.lastActivity.getTime() - new Date(Number(session.sessionId) * 1000).getTime();
  // Attach session info to the request object
  (req as any).session = {
    user,
    newSession,
    sessionId: session.sessionId,
    sessionCount: session.sessionCount,
    engagementTime: engagementTime || 1
  };

  next();
}

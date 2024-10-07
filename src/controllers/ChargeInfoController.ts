import AppError from '../errors/AppError';
import CreateChargeService from '../services/ChargeInfoService/CreateChargeService';
import UpdateChargeService from '../services/ChargeInfoService/UpdateChargeService';
import { FindByCompany } from '../services/ChargeInfoService/FindChargeService';

import { Request, Response } from 'express';
import { IChargeInfo } from '../services/ChargeInfoService/IChargeInfo';
import { DeleteByCompany } from '../services/ChargeInfoService/DeleteChargeInfo';

export const store = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);

  const newCompany: IChargeInfo = req.body;

  try {
    return res.status(200).json(await CreateChargeService(newCompany));
  } catch (err: any) {
    res.status(400).json(err);

    throw new AppError(err.message);
  }
};

export const deleteCharge = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { companyid } = req.params;

  try {
    return res.status(200).json(await DeleteByCompany(companyid));
  } catch (err: any) {
    res.status(400).json(err);

    throw new AppError(err.message);
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ChargeInfoData: IChargeInfo = req.body;

  try {
    const company = await UpdateChargeService(ChargeInfoData);

    return res.status(200).json(company);
  } catch (err) {
    res.status(400).json(err);
    throw new AppError(err.message);
  }
};

export const findByCompany = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { companyid } = req.params;

    await FindByCompany(companyid)
      .then(resp => {
        if (resp) {
          return res.status(200).json(resp);
        }
      })
      .catch(err => {
        return res.status(400);
      });
  } catch (err) {
    return res.status(405);
  }
};

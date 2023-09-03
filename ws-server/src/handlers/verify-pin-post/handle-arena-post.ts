import { Request, Response } from 'express';
import { FromSchema } from 'json-schema-to-ts';
import { AssertValidJsonError } from 'universal/src/assert-valid-json';

import { BadRequestError, ForbiddenError } from '../../shared/error';
import { pinAtom } from '../../shared/pin';
import { assertValidJson } from '../../utils/assert-valid-json';
import { requestSchema } from './request-schema';

/**
 * @public
 */
export function handle(req: Request, res: Response): void {
  const body: unknown = req.body;

  try {
    assertValidJson<FromSchema<typeof requestSchema>>(requestSchema, body);
  } catch (e) {
    if (e instanceof AssertValidJsonError) {
      throw new BadRequestError(e.message);
    }
    throw e;
  }

  if (body.pin !== pinAtom.get()) {
    throw new ForbiddenError('invalid');
  }

  res.status(200).send();
}

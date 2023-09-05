import { Request, Response } from 'express';
import { FromSchema } from 'json-schema-to-ts';
import { AssertValidJsonError } from 'universal/src/assert-valid-json';

import { codeAtom } from '../../shared/code';
import { ForbiddenError } from '../../shared/error';
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
      console.error(e);
      throw new ForbiddenError('invalid');
    }
    throw e;
  }

  if (body.code !== codeAtom.get()) {
    throw new ForbiddenError('invalid');
  }

  res.status(200).send();
}

import { Storage } from '@mondaycom/apps-sdk';
import type { Subscription, Token } from './types';
import { getOperationsByPlanId } from './utils';

enum StorageLabels {
  USED_OPERATIONS = 'USED_OPERATIONS',
}

export type UsedOperations = {
  value: string;
  version: string;
};

type IncrementStorageCounterParams = {
  token: Token;
  subscription: Subscription;
  onOperationsLimitReached: () => void;
  onIncrementFailure: () => void;
  onIncrementSuccess?: ({
    newOperationsCount,
  }: {
    newOperationsCount: number;
  }) => void;
};

export const incrementOperationsCounter = async ({
  token,
  subscription,
  onOperationsLimitReached,
  onIncrementFailure,
  onIncrementSuccess,
}: IncrementStorageCounterParams) => {
  const storage = new Storage(token);

  const maxOperationsCount = getOperationsByPlanId({
    planId: subscription.plan_id,
    isTrial: subscription.is_trial,
  });

  const usedOperations = await storage.get<UsedOperations>(
    StorageLabels.USED_OPERATIONS,
    {
      shared: true,
    },
  );

  const usedOperationsCount = usedOperations.value
    ? parseInt(usedOperations?.value)
    : 0;

  if (usedOperationsCount >= maxOperationsCount) {
    onOperationsLimitReached();
  }

  const operationsUpdateResponse = await storage.set(
    StorageLabels.USED_OPERATIONS,
    usedOperationsCount + 1,
    {
      previousVersion: usedOperations.value
        ? usedOperations.version
        : undefined,
      shared: true,
    },
  );

  if (!operationsUpdateResponse || !operationsUpdateResponse.success) {
    onIncrementFailure();
  }

  onIncrementSuccess &&
    onIncrementSuccess({ newOperationsCount: usedOperationsCount + 1 });
};

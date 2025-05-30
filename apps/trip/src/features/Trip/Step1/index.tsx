import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import FormInput from '@shared/components/Form/FormInput';
import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAddTrip } from '../apis/queries';
import styles from '../tripLayout.module.css';

import { getStep1schema, Step1FormMapping, Step1FormType } from './validation';

import TransportRadio from '@/components/TransportRadio';

const Step1 = () => {
  const { t } = useTranslation();
  const Step1schema = useMemo(() => getStep1schema(t), [t]);
  const formProps = useForm<Step1FormType>({
    resolver: zodResolver(Step1schema),
  });
  const { mutate, isLoading } = useAddTrip();

  const onSubmit: SubmitHandler<Step1FormType> = (data) => {
    mutate(data);
  };
  return (
    <FormProvider {...formProps}>
      <form className={styles.record}>
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.TripName}
          label={t('trip.trip_name')}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Destination}
          label={t('trip.destination')}
        />
        <FormInput
          className={styles.baseForm}
          name={Step1FormMapping.Participants}
          label={t('trip.numOfTravelers')}
          type="number"
        />
        <TransportRadio />
      </form>
      <Button
        className={classNames([styles.buttons, styles.baseButton])}
        type="submit"
        variant="contained"
        color="primary"
        loading={isLoading}
        onClick={formProps?.handleSubmit(onSubmit)}
      >
        {t('common.save_continue')}
      </Button>
    </FormProvider>
  );
};

export default memo(Step1);

import { TextField } from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';
import CustomDatePicker from '../customDatePicker';
import dayjs from 'dayjs';

const CustomFormikDatePicker: React.FC<{ label: string; name: string }> = ({ label, name }) => {
    const { touched, errors } = useFormikContext();

    return (
        <Field name={name}>
            {({ field, form }: FieldProps<unknown>) => (
                <CustomDatePicker
                    label={label}
                    value={field.value as string}
                    onChange={(date) => form.setFieldValue(name, date ? dayjs(date) : null)}
                    error={touched[name as keyof typeof touched] && !!errors[name as keyof typeof errors]}
                    helperText={touched[name as keyof typeof touched] && errors[name as keyof typeof errors]}
                />
            )}
        </Field>
    );
};

export default CustomFormikDatePicker;

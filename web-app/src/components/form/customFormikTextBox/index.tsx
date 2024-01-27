import { TextField } from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';

const CustomFormikTextBox: React.FC<{ label: string; name: string }> = ({ label, name }) => {
    const { touched, errors } = useFormikContext();

    return (
        <Field name={name}>
            {({ field }: FieldProps<unknown>) => (
                <TextField
                    {...field}
                    label={label}
                    error={touched[name as keyof typeof touched] && !!errors[name as keyof typeof errors]}
                    helperText={touched[name as keyof typeof touched] && errors[name as keyof typeof errors]}
                />
            )}
        </Field>
    );
};

export default CustomFormikTextBox;

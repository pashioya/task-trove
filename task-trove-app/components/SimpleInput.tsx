import * as React from 'react';
import { type TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { type ZodSchema } from 'zod';

type SimpleInputProps = {
  onSubmit: (value: string) => void;
  label: string;
  placeholder?: string;
  current_value?: string;
  helperText?: string;
  numeric?: boolean;
  validationSchema: ZodSchema;
};

export function SimpleInput({
  onSubmit,
  label,
  placeholder,
  current_value,
  helperText,
  numeric,
  validationSchema,
}: SimpleInputProps) {
  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>(current_value || '');
  const [err, setErr] = React.useState<string | null>(null);

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
  }

  function onChangeText(text: string) {
    if (err) {
      setErr(null);
    }
    setValue(numeric ? text.replace(/[^0-9]/g, '') : text); // Allow only numeric characters if numeric is true
  }

  function onSubmitEditing() {
    const result = validationSchema.safeParse({ value });
    if (!result.success) {
      setErr(result.error.errors[0].message);
      return;
    }
    setErr(null);
    onSubmit(value);
  }

  return (
    <View className="w-full">
      <Label
        className={cn(err && 'text-destructive', '')}
        nativeID="inputLabel"
        onPress={handleOnLabelPress}
      >
        {label}
      </Label>
      <Input
        className="w-96"
        ref={inputRef}
        keyboardType={numeric ? 'numeric' : 'default'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={value}
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
      />
      {err && <ErrorMessage msg={err} />}
      {!err && <Text className="text-sm native:px-1 py-1.5">{helperText}</Text>}
    </View>
  );
}

function ErrorMessage({ msg }: { msg: string }) {
  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      className="text-destructive text-sm native:px-1 py-1.5"
      aria-invalid="true"
      id="inputError"
    >
      {msg}
    </Animated.Text>
  );
}

import type { ReadingPreferences } from '../../model/ui';

export interface ReadingSettingsProps {
  preferences: ReadingPreferences;
  onChange: (preferences: ReadingPreferences) => void;
}

const fontSizeOptions: ReadonlyArray<{ value: ReadingPreferences['fontSize']; label: string; valueLabel: string }> = [
  { value: 18, label: '작게', valueLabel: '18px' },
  { value: 20, label: '보통', valueLabel: '20px' },
  { value: 22, label: '크게', valueLabel: '22px' },
];

const lineHeightOptions: ReadonlyArray<{ value: ReadingPreferences['lineHeight']; label: string; valueLabel: string }> = [
  { value: 1.6, label: '촘촘하게', valueLabel: '1.6' },
  { value: 1.8, label: '넉넉하게', valueLabel: '1.8' },
  { value: 2, label: '아주 넉넉하게', valueLabel: '2' },
];

const readingWidthOptions: ReadonlyArray<{ value: ReadingPreferences['readingWidth']; label: string }> = [
  { value: 'narrow', label: '좁은 읽기 폭' },
  { value: 'standard', label: '표준 읽기 폭' },
];

export function ReadingSettings({ preferences, onChange }: ReadingSettingsProps) {
  return (
    <section className="reading-settings" aria-labelledby="reading-settings-title">
      <h3 id="reading-settings-title">읽기 설정</h3>
      <p className="reading-settings__intro">글자와 줄 간격을 바꾸면 이 탭의 읽기 화면에 바로 적용됩니다.</p>
      <fieldset>
        <legend>글자 크기</legend>
        {fontSizeOptions.map((option) => (
          <label key={option.value}>
            <input type="radio" name="reading-font-size" value={option.value} checked={preferences.fontSize === option.value} onChange={() => onChange({ ...preferences, fontSize: option.value })} />
            <span>{option.label}</span><small className="reading-setting-value">{option.valueLabel}</small>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>줄 간격</legend>
        {lineHeightOptions.map((option) => (
          <label key={option.value}>
            <input type="radio" name="reading-line-height" value={option.value} checked={preferences.lineHeight === option.value} onChange={() => onChange({ ...preferences, lineHeight: option.value })} />
            <span>{option.label}</span><small className="reading-setting-value">{option.valueLabel}</small>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>읽기 폭</legend>
        {readingWidthOptions.map((option) => (
          <label key={option.value}>
            <input type="radio" name="reading-width" value={option.value} checked={preferences.readingWidth === option.value} onChange={() => onChange({ ...preferences, readingWidth: option.value })} />{option.label}
          </label>
        ))}
      </fieldset>
    </section>
  );
}

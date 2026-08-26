import type { ReadingPreferences } from '../../model/ui';

export interface ReadingSettingsProps {
  preferences: ReadingPreferences;
  onChange: (preferences: ReadingPreferences) => void;
}

export function ReadingSettings({ preferences, onChange }: ReadingSettingsProps) {
  return (
    <section className="reading-settings" aria-labelledby="reading-settings-title">
      <h3 id="reading-settings-title">읽기 설정</h3>
      <p className="reading-settings__intro">글자와 줄 간격을 바꾸면 이 탭의 읽기 화면에 바로 적용됩니다.</p>
      <fieldset>
        <legend>글자 크기</legend>
        <label><input type="radio" name="reading-font-size" value="18" checked={preferences.fontSize === 18} onChange={() => onChange({ ...preferences, fontSize: 18 })} />18px</label>
        <label><input type="radio" name="reading-font-size" value="20" checked={preferences.fontSize === 20} onChange={() => onChange({ ...preferences, fontSize: 20 })} />20px</label>
        <label><input type="radio" name="reading-font-size" value="22" checked={preferences.fontSize === 22} onChange={() => onChange({ ...preferences, fontSize: 22 })} />22px</label>
      </fieldset>
      <fieldset>
        <legend>줄 간격</legend>
        <label><input type="radio" name="reading-line-height" value="1.6" checked={preferences.lineHeight === 1.6} onChange={() => onChange({ ...preferences, lineHeight: 1.6 })} />1.6</label>
        <label><input type="radio" name="reading-line-height" value="1.8" checked={preferences.lineHeight === 1.8} onChange={() => onChange({ ...preferences, lineHeight: 1.8 })} />1.8</label>
        <label><input type="radio" name="reading-line-height" value="2" checked={preferences.lineHeight === 2} onChange={() => onChange({ ...preferences, lineHeight: 2 })} />2</label>
      </fieldset>
      <fieldset>
        <legend>읽기 폭</legend>
        <label><input type="radio" name="reading-width" value="narrow" checked={preferences.readingWidth === 'narrow'} onChange={() => onChange({ ...preferences, readingWidth: 'narrow' })} />좁은 읽기 폭</label>
        <label><input type="radio" name="reading-width" value="standard" checked={preferences.readingWidth === 'standard'} onChange={() => onChange({ ...preferences, readingWidth: 'standard' })} />표준 읽기 폭</label>
      </fieldset>
    </section>
  );
}

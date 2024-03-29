import { Component, OnInit, Input } from '@angular/core';
import { CodexEntry } from '../../models/codex-entry.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-codex',
  templateUrl: './codex.component.html',
  styleUrls: ['./codex.component.scss'],
})
export class CodexComponent implements OnInit {
  @Input() codexEntries: CodexEntry[] = [];
  selectedEntry: CodexEntry | null = null;

  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {}

  onEntrySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    if (selectedIndex !== 0) {
      const selectedValue = target.options[selectedIndex].value;
      this.selectedEntry =
        this.codexEntries.find((entry) => entry.title === selectedValue) ||
        null;
    } else {
      this.selectedEntry = null;
    }
  }
}

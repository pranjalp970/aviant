/**
 * Read the value of a top-level string field out of a JSON document that is
 * still streaming in, e.g. `{"reply":"Good. Next question: wh` → "Good. Next question: wh".
 * Stops before a half-received escape sequence so no garbage characters leak out.
 * Returns null until the field has started.
 */
export function partialStringField(json: string, field: string): { value: string; complete: boolean } | null {
  const key = json.indexOf(`"${field}"`);
  if (key < 0) return null;
  let i = json.indexOf(":", key + field.length + 2);
  if (i < 0) return null;
  i++;
  while (i < json.length && /\s/.test(json[i])) i++;
  if (json[i] !== '"') return null;
  i++;

  let out = "";
  while (i < json.length) {
    const ch = json[i];
    if (ch === '"') return { value: out, complete: true };
    if (ch !== "\\") {
      out += ch;
      i++;
      continue;
    }
    // escape sequence
    const next = json[i + 1];
    if (next === undefined) break; // incomplete: wait for more
    const simple: Record<string, string> = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", '"': '"', "\\": "\\", "/": "/" };
    if (next in simple) {
      out += simple[next];
      i += 2;
      continue;
    }
    if (next === "u") {
      const hex = json.slice(i + 2, i + 6);
      if (hex.length < 4) break; // incomplete \uXXXX
      out += String.fromCharCode(parseInt(hex, 16));
      i += 6;
      continue;
    }
    i += 2; // unknown escape: skip it
  }
  return { value: out, complete: false };
}

/**
 * Split off complete sentences from streamed text so each can be spoken as
 * soon as it's finished. Returns the sentences ready to speak and the index
 * up to which text has been consumed.
 */
export function takeSentences(text: string, from: number, final = false): { sentences: string[]; next: number } {
  const sentences: string[] = [];
  let start = from;
  // sentence end: . ! ? (optionally followed by a closing quote/paren) then whitespace.
  // "91.155" or "e.g.," don't match because no whitespace follows the dot.
  const re = /[.!?]["')\]]?\s+/g;
  re.lastIndex = from;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const end = m.index + m[0].length;
    const s = text.slice(start, end).trim();
    // merge very short fragments ("Okay.") into the next sentence unless it's the first thing said
    if (s.length >= 12 || (sentences.length === 0 && start === 0)) {
      sentences.push(s);
      start = end;
    }
  }
  // A long sentence still being written: speak up to its last clause break so audio
  // isn't held back by one long sentence.
  if (!final && text.length - start > 140) {
    const pending = text.slice(start);
    let cut = -1;
    const clause = /[,;:]\s+/g;
    let c: RegExpExecArray | null;
    while ((c = clause.exec(pending))) if (c.index >= 50) cut = c.index + c[0].length;
    if (cut > 0) {
      sentences.push(pending.slice(0, cut).trim());
      start += cut;
    }
  }
  if (final && start < text.length) {
    const rest = text.slice(start).trim();
    if (rest) sentences.push(rest);
    start = text.length;
  }
  return { sentences, next: start };
}

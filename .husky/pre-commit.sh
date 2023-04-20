#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo 'Running Git Hooks'

echo "🔎... Checking validity of types with TypeScript"

yarn type-check || (
    "⛔️ There is a type error in your code, fix it first, and try commit again. ⛔️";
    false;
)
echo "✅ No TypeError found"
echo "⌛️ Running lint staged and git commit ⌛️"

yarn lint-staged
### Hexlet tests and linter status:

[![Actions Status](https://github.com/Smolyakov-Andrei/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Smolyakov-Andrei/frontend-project-46/actions)

# Gendiff - File Difference Tool

[![CI](https://github.com/Smolyakov-Andrei/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/Smolyakov-Andrei/frontend-project-46/actions/workflows/ci.yml)
[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=Smolyakov-Andrei_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Smolyakov-Andrei_frontend-project-46)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Smolyakov-Andrei_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Smolyakov-Andrei_frontend-project-46)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Smolyakov-Andrei_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Smolyakov-Andrei_frontend-project-46)

A CLI tool for comparing configuration files in JSON and YAML formats with multiple output formats.

## 📦 Installation

### Global installation

```bash
npm install -g @hexlet/code
```

Local installation from repository

```bash
git clone https://github.com/Smolyakov-Andrei/frontend-project-46.git
cd frontend-project-46
make install
npm link
```

Usage

```bash
gendiff [options] <filepath1> <filepath2>

Options:
-V, --version - output the version number

-f, --format <type> - output format: stylish, plain, or json (default: "stylish")

-h, --help - display help for command
```

📋 Supported Formats
Input Formats:
✅ JSON (.json)

✅ YAML (.yaml, .yml)

Output Formats:
Stylish (default) - Visual tree representation with + and - indicators

Plain - Human-readable text descriptions

JSON - Structured JSON for programmatic use

Comparing JSON files with stylish format (default)

gendiff **fixtures**/file1.json **fixtures**/file2.json

Output:

```bash
{
common: { + follow: false
setting1: Value 1 - setting2: 200 - setting3: true + setting3: null + setting4: blah blah + setting5: {
key5: value5
}
setting6: {
doge: { - wow: + wow: so much
}
key: value + ops: vops
}
}
group1: { - baz: bas + baz: bars
foo: bar - nest: {
key: value
} + nest: str
}

- group2: {
  abc: 12345
  deep: {
  id: 45
  }
  }

* group3: {
  deep: {
  id: {
  number: 45
  }
  }
  fee: 100500
  }
  }

Comparing YAML files with plain format

gendiff --format plain **fixtures**/file1.yaml **fixtures**/file2.yaml

Output:

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]

Comparing mixed files with JSON format

gendiff --format json **fixtures**/file1.json **fixtures**/file2.yaml

Output:

[
{
"type": "nested",
"key": "common",
"children": [
{
"type": "added",
"key": "follow",
"value": false
},
{
"type": "unchanged",
"key": "setting1",
"value": "Value 1"
},
{
"type": "removed",
"key": "setting2",
"value": 200
},
{
"type": "changed",
"key": "setting3",
"oldValue": true,
"newValue": null
}
// ... остальная структура diff
]
}
]
```

🛠️ Development

```bash
make install

Run tests

make test

Run linter

make lint
```

🏗️ Project Structure

```bash
frontend-project-46/
├── src/
│ ├── formatters/
│ │ ├── index.js # Форматтер-диспетчер
│ │ ├── stylish.js # Stylish форматтер
│ │ ├── plain.js # Plain форматтер
│ │ └── json.js # JSON форматтер
│ ├── gendiff.js # Основная логика сравнения
│ ├── index.js # Точка входа
│ ├── parsers.js # Парсеры JSON/YAML
│ └── utils.js # Вспомогательные функции
├── **tests**/ # Тесты
├── **fixtures**/ # Тестовые файлы
├── bin/ # CLI интерфейс
└── Makefile # Утилиты сборки
```

📚 Requirements
Node.js 14+

npm 6+

📄 License
ISC
EOF

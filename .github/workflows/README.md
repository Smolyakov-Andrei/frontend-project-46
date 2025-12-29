# Automatic tests

After completing all the steps in the project, automatic tests will become available to you. Tests are run on each commit - once all tasks in the Hexlet interface are completed, make a commit, and the tests will run automatically.

The hexlet-check.yml file is responsible for running these tests - do not delete this file, edit it, or rename the repository.

# Gendiff - File Difference Tool

[![CI](https://github.com/Smolyakov-Andrei/frontend-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/Smolyakov-Andrei/frontend-project-46/actions/workflows/ci.yml)
[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=Smolyakov-Andrei_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Smolyakov-Andrei_frontend-project-46)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Smolyakov-Andrei_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Smolyakov-Andrei_frontend-project-46)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Smolyakov-Andrei_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Smolyakov-Andrei_frontend-project-46)

A CLI tool for comparing configuration files (JSON, YAML).

## 📦 Installation

```bash
npm install -g @hexlet/code
```

gendiff .\_\_fixtures**\file1.json .\_\_fixtures**\file2.json
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

<h1 align="center">Zest</h1>

<p align="center">
  <strong>Testing reporter that lives in your menubar</strong></br>
  Made with love & <a href="http://electron.atom.io/">Electron</a>.</br></br>
  <a href="https://github.com/epilande/zest/releases/latest"><img src="https://github.com/epilande/zest/blob/master/public/ZT-screenshot.png"/></a></br></br>
</p>


## Install
[**Download the latest version**](https://github.com/epilande/zest/releases/latest), unzip, and move `Zest.app` into your Applications folder.


## Quick Start

**Clone this repo**

```bash
$ git clone https://github.com/epilande/zest.git
$ cd zest
```

**Install dependencies**

```bash
$ npm install
```

**Launch dev environment**

```bash
$ npm run dev
```

**Package app**

```bash
$ npm run build
```


## Setup

This project only works with projects that use karma and mocha. Specifically the projects need to run with [karma-json-reporter](https://www.npmjs.com/package/karma-json-reporter) and mocha's built in `json` reporter.

Internally, Zest will go into the project and run `npm test`. This is to make sure it uses the same packages/configurations as you would if you ran your tests manually in the console.

*Note: Make sure no watch task is running by default on `npm test`, Zest will wait for the process to end before continuing.*


## Usage

This is an application geared towards Node.js developers who use Mocha and Karma for writing tests. When the app is installed, it will add itself as a menubar icon that will allow you an overview of the status of all your projects' tests.

![zest gif](https://github.com/epilande/zest/blob/master/public/ZT-gif.gif)

By clicking the menubar icon, a new window will appear with a list of projects Zest knows of.


### Adding a project

Clicking the **`+`** icon at the top left corner of the window will allow you to select a project to run tests.

Once a project is selected, the tests will run immediately and file watchers will be set up to rerun if any changes are made to that directory.


### Removing repositories

Unfortunately, the only way to remove repositories right now is to remove the application data by deleting the application data directory (located at `~/Library/Application\ Support/Zest/`).


### Quitting the application

While the application is focused you can exit the app by using the keyboard shortcut `Cmd + Q`. Any file watchers that were running will be terminated.


### Support

We currently only support Mac. Though, it may partially work on Windows. We really don't know. If you are brave enough to try it out let us know!


---

**[Zest](https://www.nodeknockout.com/entries/292-zest)** was a [Node Knockout](https://www.nodeknockout.com/) project.


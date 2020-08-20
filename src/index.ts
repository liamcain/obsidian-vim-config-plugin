import { clipboard } from "electron";

import { BasePlugin } from "./types";

class VimTweaksPlugin extends BasePlugin {
  CodeMirror: any;

  constructor() {
    super();

    this.id = "vim-tweaks";
    this.name = "VIM Tweaks";
    this.description = "Small tweaks to improve CodeMirror vim-mode";
    this.defaultOn = true;

    // @ts-ignore
    this.CodeMirror = window.CodeMirror;
  }

  onEnable() {
    // set clipboard=unnamed
    const unnamedRegister = this.CodeMirror.Vim.getRegisterController()[
      "unnamedRegister"
    ];
    const defaultSetText = unnamedRegister.setText.bind(unnamedRegister);
    unnamedRegister.setText = function (text, linewise, blockwise) {
      defaultSetText(text, linewise, blockwise);
      clipboard.writeText(text);
    };

    unnamedRegister.toString = function () {
      return clipboard.readText();
    };

    // noremap <silent> k gk
    // noremap <silent> j gj
    this.CodeMirror.Vim.map("k", "gk");
    this.CodeMirror.Vim.map("j", "gj");
  }

  onDisable() {
    // reset unnamed register's `.setText`
    const unnamedRegister = this.CodeMirror.Vim.getRegisterController()[
      "unnamedRegister"
    ];
    unnamedRegister.setText = unnamedRegister.__proto__.setText;
    unnamedRegister.toString = unnamedRegister.__proto__.toString;
  }
}

module.exports = () => new VimTweaksPlugin();

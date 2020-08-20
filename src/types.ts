export class BasePlugin {
  id: string;
  name: string;
  description?: string;
  defaultOn: boolean;

  app: any;
  instance: any;

  init(app: any, instance: any) {
    this.app = app;
    this.instance = instance;
  }

  onEnable() {}
  onLoad() {}
}

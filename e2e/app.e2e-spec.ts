import { DevNg2ImageUploadPage } from './app.po';

describe('dev-ng2-image-upload App', function() {
  let page: DevNg2ImageUploadPage;

  beforeEach(() => {
    page = new DevNg2ImageUploadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

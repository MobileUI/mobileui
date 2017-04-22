var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var fs = require('fs');
var exec = require('child_process').exec;

describe('#show intro', function() {
  var captured_stdout;
  before(function (done) {
      exec('node ./bin/mobileui', function (error, stdout, stderr) {
          if (error) return done(error);
          captured_stdout = stdout;
          done();
      });
  });
  it('should show message about command exec', function() {
      captured_stdout.should.to.contain('Version installed');
  });

});

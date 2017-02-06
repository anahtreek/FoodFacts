const should = require('chai').should(),
expect = require('chai').expect,
sinon = require('sinon'),
readline = require('readline'),
fs=require('fs'),
convert = require('../js/carboProteinFat');

describe('A series of test for Converting  CSV to JSON',
	function(err){

  it('should return sucess message', function(done){
  	var result = convert('testFile', 'testFile');
  	result.should.be.equal('JSON written successfully');
    done();
    });
  it('should fail if parameter is not provided', function(done){
    var result = convert();
    result.should.be.equal('Enter parameters');
    done();
    });
});
describe('Test createInterface method of readline', function(err){
		it('should be called only once', function() {
      var spyCreateInterface = sinon.spy(readline, 'createInterface');
      convert('testFile', 'testFile');
      readline.createInterface.restore();
      sinon.assert.calledOnce(spyCreateInterface);
    });
});
describe('Test on method of Interface for line event', function(err){
  it('should be called', function() {
    var stub = sinon.stub(readline.Interface.prototype, 'on');
    convert('testFile', 'testFile');
    sinon.assert.called(stub);
    readline.Interface.prototype.on.restore();
    sinon.assert.calledWith(stub,'line');
  });
});
describe('Test on method of Interface for close event', function(err){
  it('should be called', function() {
    var stub = sinon.stub(readline.Interface.prototype,'on');
    convert('testFile', 'testFile');
    readline.Interface.prototype.on.restore();
    sinon.assert.calledWith(stub,'close');
  });
});

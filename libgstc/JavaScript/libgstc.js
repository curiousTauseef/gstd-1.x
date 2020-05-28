// GStreamer Daemon - gst-launch on steroids
// JavaScript client library abstracting gstd interprocess communication

// Copyright (c) 2015-2020 RidgeRun, LLC (http://www.ridgerun.com)

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:

// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.

// 2. Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following
// disclaimer in the documentation and/or other materials provided
// with the distribution.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
// OF THE POSSIBILITY OF SUCH DAMAGE.

class GstdClient {

  constructor(ip='http://localhost',port=5000){
    this.ip = ip;
    this.port = port;
  }

  static send_cmd(http, callback) {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        callback(http.responseText);
      } else {
        callback('Error: ' + http.status+". " + http.responseText);
      }
    }
  }

  static check_callback(callback) {
    if (typeof callback !== "function"){
      console.error ("Provide a callback function");
      return false;
    }
    return true;
  }

  list_pipelines(callback) {

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('GET', this.ip + ":" + this.port + "/pipelines");
    http.send();
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }

  pipeline_create(pipe_name, pipe_desc, callback){

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('POST', this.ip + ":" + this.port + "/pipelines?name="+pipe_name+"&description="+pipe_desc);
    let jBodyMsg = JSON.stringify({
      name: pipe_name,
      description: pipe_desc
    });
    http.send(jBodyMsg);
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }

  pipeline_play(pipe_name, callback){

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('PUT', this.ip + ":" + this.port + "/pipelines/"+pipe_name+"/state?name=playing");
    let jBodyMsg = JSON.stringify({
      name: "playing"
    });
    http.send(jBodyMsg);
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }

  element_set(pipe_name, element, prop, value, callback){

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('PUT', this.ip + ":" + this.port + "/pipelines/"+pipe_name+"/elements/"+element+"/properties/"+prop+"?name="+value);
    let jBodyMsg = JSON.stringify({
      name: "paused"
    });
    http.send(jBodyMsg);
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }

  pipeline_pause(pipe_name, callback){

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('PUT', this.ip + ":" + this.port + "/pipelines/"+pipe_name+"/state?name=paused");
    let jBodyMsg = JSON.stringify({
      name: "paused"
    });
    http.send(jBodyMsg);
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }

  pipeline_stop(pipe_name, callback){

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('PUT', this.ip + ":" + this.port + "/pipelines/"+pipe_name+"/state?name=null");
    let jBodyMsg = JSON.stringify({
      name: "null"
    });
    http.send(jBodyMsg);
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }

  pipeline_delete(pipe_name, callback){

    if(!GstdClient.check_callback(callback)) {
      return TypeError;
    }

    var http = new XMLHttpRequest();
    http.open('DELETE', this.ip + ":" + this.port + "/pipelines?name="+pipe_name);
    let jBodyMsg = JSON.stringify({
      name: pipe_name
    });
    http.send(jBodyMsg);
    http.onreadystatechange = function (){
      GstdClient.send_cmd(http, callback);
    }
  }
}
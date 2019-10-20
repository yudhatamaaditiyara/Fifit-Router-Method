/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 */
class Method
{
	/**
	 * @param {Object|void} routes
	 */
	constructor(routes){
		this._stack = {};
		if (routes != null) {
			this.routes(routes);
		}
	}

	/**
	 * @param {string} method
	 * @returns {Method}
	 */
	has(method){
		return Object.prototype.hasOwmProperty.call(this._stack, method.toUpperCase());
	}

	/**
	 * @param {string} method
	 * @param {function} callback
	 * @throws {Error}
	 * @returns {Method}
	 */
	route(method, callback){
		if (typeof callback != 'function') {
			throw new Error('The callback must be type of function');
		}
		this._stack[method.toUpperCase()] = callback;
		return this;
	}

	/**
	 * @param {Object} routes
	 * @returns {Method}
	 */
	routes(routes){
		Object.keys(routes).forEach(method => this.route(method, routes[method]));
		return this;
	}

	/**
	 * @param {Context} context
	 * @param {function} done
	 * @returns {any}
	 */
	handle(context, done){
		let method = context.request.method;
		if (this._stack[method]) {
			return this._stack[method](context, done);
		}
		return done();
	}
}

/**
 * @+
 */
module.exports = Method;
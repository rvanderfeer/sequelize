'use strict';

var _ = require( 'lodash' ),
	Abstract = require( '../abstract' ),
	ConnectionManager = require( './connection-manager' ),
	Query = require( './query' ),
	QueryGenerator = require( './query-generator' ),
	DataTypes = require( '../../data-types' ).spatialite;

var SpatialiteDialect = function( sequelize ) {
	this.sequelize = sequelize;
	this.connectionManager = new ConnectionManager( this, sequelize );
	this.QueryGenerator = _.extend( {}, QueryGenerator, {
		options: sequelize.options,
		_dialect: this,
		sequelize: sequelize
	} );
};

SpatialiteDialect.prototype.supports = _.merge( _.cloneDeep( Abstract.prototype.supports ), {
	'DEFAULT': false,
	'DEFAULT VALUES': true,
	'UNION ALL': false,
	'IGNORE': ' OR IGNORE',
	index: {
		using: false
	},
	transactionOptions: {
		type: true
	},
	joinTableDependent: false,
	groupedLimit: false,
	ignoreDuplicates: ' OR IGNORE'
} );

ConnectionManager.prototype.defaultVersion = '3.8.0';
SpatialiteDialect.prototype.Query = Query;
SpatialiteDialect.prototype.DataTypes = DataTypes;
SpatialiteDialect.prototype.name = 'spatialite';
SpatialiteDialect.prototype.TICK_CHAR = '`';
SpatialiteDialect.prototype.TICK_CHAR_LEFT = SpatialiteDialect.prototype.TICK_CHAR;
SpatialiteDialect.prototype.TICK_CHAR_RIGHT = SpatialiteDialect.prototype.TICK_CHAR;

module.exports = SpatialiteDialect;

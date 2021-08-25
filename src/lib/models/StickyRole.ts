import { Snowflake } from 'discord.js';
import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from './BaseModel';

export interface StickyRoleModel {
	user: Snowflake;
	guild: Snowflake;
	roles: Snowflake[];
	nickname: string;
}
export interface StickyRoleModelCreationAttributes {
	user: Snowflake;
	guild: Snowflake;
	roles: Snowflake[];
	nickname?: string;
}

const NEVER_USED = 'This should never be executed';

export class StickyRole extends BaseModel<StickyRoleModel, StickyRoleModelCreationAttributes> implements StickyRoleModel {
	/**
	 * The id of the user the roles belongs to
	 */
	public get user(): Snowflake {
		throw new Error(NEVER_USED);
	}
	public set user(_: Snowflake) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The guild where this should happen
	 */
	public get guild(): Snowflake {
		throw new Error(NEVER_USED);
	}
	public set guild(_: Snowflake) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The roles that the user should have returned
	 */
	public get roles(): Snowflake[] {
		throw new Error(NEVER_USED);
	}
	public set roles(_: Snowflake[]) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The user's previous nickname
	 */
	public get nickname(): string {
		throw new Error(NEVER_USED);
	}
	public set nickname(_: string) {
		throw new Error(NEVER_USED);
	}

	public static initModel(sequelize: Sequelize): void {
		StickyRole.init(
			{
				user: {
					type: DataTypes.STRING,
					allowNull: false
				},
				guild: {
					type: DataTypes.STRING,
					allowNull: false
				},
				roles: {
					type: DataTypes.STRING,
					get: function () {
						return JSON.parse(this.getDataValue('roles') as unknown as string);
					},
					set: function (val: Snowflake[]) {
						return this.setDataValue('roles', JSON.stringify(val) as unknown as Snowflake[]);
					},
					allowNull: true
				},
				nickname: {
					type: DataTypes.STRING,
					allowNull: true
				}
			},
			{ sequelize }
		);
	}
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vs/nls';
import { IConfigurationPropertySchema } from 'vs/platform/configuration/common/configurationRegistry';
import { languagesExtPoint } from 'vs/workbench/services/mode/common/workbenchModeService';

export enum DocumentationExtensionPointFields {
	when = 'when',
	title = 'title',
	command = 'command',
	view = 'view',
	contents = 'contents',
}

export interface RefactoringDocumentationExtensionPoint {
	readonly [DocumentationExtensionPointFields.title]: string;
	readonly [DocumentationExtensionPointFields.when]: string;
	readonly [DocumentationExtensionPointFields.command]: string;
}

export interface ViewDocumentationExtensionPoint {
	readonly [DocumentationExtensionPointFields.view]: string;
	readonly [DocumentationExtensionPointFields.contents]: string;
	readonly [DocumentationExtensionPointFields.when]: string;
}

export interface DocumentationExtensionPoint {
	readonly refactoring?: readonly RefactoringDocumentationExtensionPoint[];
	readonly view?: readonly ViewDocumentationExtensionPoint[];
}

const documentationExtensionPointSchema = Object.freeze<IConfigurationPropertySchema>({
	type: 'object',
	description: nls.localize('contributes.documentation', "Contributed documentation."),
	properties: {
		'refactoring': {
			type: 'array',
			description: nls.localize('contributes.documentation.refactorings', "Contributed documentation for refactorings."),
			items: {
				type: 'object',
				description: nls.localize('contributes.documentation.refactoring', "Contributed documentation for refactoring."),
				required: [
					DocumentationExtensionPointFields.title,
					DocumentationExtensionPointFields.when,
					DocumentationExtensionPointFields.command
				],
				properties: {
					[DocumentationExtensionPointFields.title]: {
						type: 'string',
						description: nls.localize('contributes.documentation.refactoring.title', "Label for the documentation used in the UI."),
					},
					[DocumentationExtensionPointFields.when]: {
						type: 'string',
						description: nls.localize('contributes.documentation.refactoring.when', "When clause."),
					},
					[DocumentationExtensionPointFields.command]: {
						type: 'string',
						description: nls.localize('contributes.documentation.refactoring.command', "Command executed."),
					},
				},
			}
		},
		'view': {
			type: 'array',
			description: nls.localize('contributes.documentation.views', "Contributed documentation for views."),
			items: {
				type: 'object',
				description: nls.localize('contributes.documentation.view', "Contributed documentation for a view."),
				required: [
					DocumentationExtensionPointFields.view,
					DocumentationExtensionPointFields.contents
				],
				properties: {
					[DocumentationExtensionPointFields.view]: {
						type: 'string',
						description: nls.localize('contributes.documentation.view.view', "View identifier for this documentation."),
					},
					[DocumentationExtensionPointFields.contents]: {
						type: 'string',
						description: nls.localize('contributes.documentation.view.contents', "Documentation contents."),
					},
					[DocumentationExtensionPointFields.when]: {
						type: 'string',
						description: nls.localize('contributes.documentation.view.when', "When clause."),
					},
				},
			}
		}
	}
});

export const documentationExtensionPointDescriptor = {
	extensionPoint: 'documentation',
	deps: [languagesExtPoint],
	jsonSchema: documentationExtensionPointSchema
};
import * as xmlParser from "fast-xml-parser";
import { parse as parseCsv } from "papaparse";
import * as uniqid from "uniqid";
import { Records } from "../types";
import { validateRecords } from "./validators";

function normalizeXml(records: any): Records {
  try {
    return records.map(
      ({ _reference, ...recordRest }: { _reference: any }) => ({
        ...recordRest,
        reference: _reference,
        id: uniqid()
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export function procesXml(data: any): Records {
  // parse xml
  const parsedXml = xmlParser.parse(data, {
    ignoreAttributes: false,
    attributeNamePrefix: "_"
  });
  // normalize xml and return
  const normalizedXml = normalizeXml(parsedXml.records.record);
  const validated = validateRecords(normalizedXml);
  return validated;
}

function normalizeCsv(csv: any): Records {
  try {
    return csv.map((record: any) => ({
      accountNumber: record["Account Number"],
      description: record["Description"],
      endBalance: record["End Balance"],
      mutation: record["Mutation"],
      reference: record["Reference"],
      startBalance: record["Start Balance"],
      id: uniqid()
    }));
  } catch (error) {
    throw new Error(error);
  }
}

export function procesCsv(data: any): Records {
  // parse csv
  const parsedCsv = parseCsv(data, {
    header: true,
    skipEmptyLines: true,
    encoding: "utf-8",
    dynamicTyping: true
  });

  const normalized = normalizeCsv(parsedCsv.data);
  const validated = validateRecords(normalized);
  return validated;
}

export async function fetchFile(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    throw new Error(error);
  }
}

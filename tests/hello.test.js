
import { hello } from "../src/hello";
import { describe, test, expect } from "vitest";

describe("hello", () => {
    test("should return 'Hello, world!'", () => {
        expect(hello()).toBe("Hello, world!");
    });
});
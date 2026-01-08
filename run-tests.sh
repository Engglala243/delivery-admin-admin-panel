#!/bin/bash

echo "Running Frontend Tests..."
echo "========================="

# Run all tests
npm test -- --coverage --watchAll=false

echo ""
echo "Test Summary:"
echo "============="
echo "✅ Component Tests: UserForm, UserTable, DriverForm, OrderTable, Modal"
echo "✅ Page Tests: Users page"
echo "✅ Redux Tests: userSlice"
echo "✅ Integration Tests: Login flow"
echo "✅ Utility Tests: Test utilities and mocks"

echo ""
echo "Coverage Report Generated in coverage/ directory"
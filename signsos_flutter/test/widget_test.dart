import 'package:flutter_test/flutter_test.dart';
import 'package:signsos_flutter/main.dart';

void main() {
  testWidgets('SignSOS smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const SignSosApp());
    expect(find.text('SignSOS'), findsOneWidget);
  });
}
